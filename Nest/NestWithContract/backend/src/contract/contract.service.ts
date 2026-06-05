import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, createPublicClient, createWalletClient, getAddress, http, Log, parseEventLogs } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { myContactAbi } from './abi/my-contact.abi';
import { ContractEvent, ContractEventDocument } from './schemas/contract-event.schema';

type ContractEventName = 'NAME_CHANGED' | 'USER_DETAILS_CHANGED';

@Injectable()
export class ContractService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ContractService.name);
  private readonly contractAddress: Address;
  private readonly account: ReturnType<typeof privateKeyToAccount>;
  private readonly publicClient;
  private readonly walletClient;
  private readonly unwatchers: Array<() => void> = [];
  constructor(private readonly configService: ConfigService,
    @InjectModel(ContractEvent.name)
    private readonly contractEventModel: Model<ContractEventDocument>,) {

    const rpcUrl = this.configService.getOrThrow<string>('HOODI_RPC_URL');

    const privateKey = this.configService.getOrThrow<string>('PRIVATE_KEY');

    this.contractAddress = getAddress(
      this.configService.getOrThrow<string>('CONTRACT_ADDRESS')
    );

    this.account = privateKeyToAccount(privateKey as `0x${string}`);

    const transport = http(rpcUrl);
    this.publicClient = createPublicClient({ transport });
    this.walletClient = createWalletClient({
      account: this.account,
      transport,
    });
  }
  onModuleInit() {
    this.startEventWatcher();
  }

  onModuleDestroy() {
    this.unwatchers.forEach((unwatch) => unwatch());
  }

  async getName() {
    const name = await this.publicClient.readContract({
      address: this.contractAddress,
      abi: myContactAbi,
      functionName: 'getName',
    });

    return { name };
  }

  async getMobile() {
    const mobile = await this.publicClient.readContract({
      address: this.contractAddress,
      abi: myContactAbi,
      functionName: 'getMobile',
    });

    return { mobile };
  }

  async getUserDetails() {
    const [name, mobile] = await this.publicClient.readContract({
      address: this.contractAddress,
      abi: myContactAbi,
      functionName: 'getUserDetails',
    });

    return { name, mobile };
  }

  async setName(name: string) {
    const hash = await this.walletClient.writeContract({
      address: this.contractAddress,
      abi: myContactAbi,
      functionName: 'setName',
      args: [name],
      account: this.account,
      chain: null,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
    await this.saveReceiptEvents(receipt.logs);

    return { transactionHash: hash, status: receipt.status };
  }

  async setUserDetails(name: string, mobile: string) {
    const hash = await this.walletClient.writeContract({
      address: this.contractAddress,
      abi: myContactAbi,
      functionName: 'setUserDetails',
      args: [name, mobile],
      account: this.account,
      chain: null,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
    await this.saveReceiptEvents(receipt.logs);

    return { transactionHash: hash, status: receipt.status };
  }

  async getEvents() {
    return this.contractEventModel.find().sort({ createdAt: -1 }).lean();
  }

  async getEventsByType(eventName: string) {
  return this.contractEventModel.find({
    eventName,
  });
}

  private startEventWatcher() {
    this.watchEvent('NAME_CHANGED');
    this.watchEvent('USER_DETAILS_CHANGED');
    this.logger.log(`Watching events for ${this.contractAddress}`);
  }

  private watchEvent(eventName: ContractEventName) {
    const unwatch = this.publicClient.watchContractEvent({
      address: this.contractAddress,
      abi: myContactAbi,
      eventName,
      fromBlock: this.getStartBlock(),
      onLogs: async (logs) => {
        for (const log of logs) {
          await this.saveContractEvent(eventName, log);
        }
      },
      onError: (error) => {
        this.logger.error(`${eventName} watcher failed`, error);
      },
    });

    this.unwatchers.push(unwatch);
  }

  private async saveReceiptEvents(logs: Log[]) {
    const parsedLogs = parseEventLogs({
      abi: myContactAbi,
      logs,
      eventName: ['NAME_CHANGED', 'USER_DETAILS_CHANGED'],
    });

    for (const log of parsedLogs) {
      await this.saveContractEvent(log.eventName, log);
    }
  }

  private async saveContractEvent(
    eventName: ContractEventName,
    log: any,
  ) {
    try {
      const eventData = this.makeEventData(eventName, log);

      if (
        !eventData.transactionHash ||
        eventData.logIndex === undefined
      ) {
        this.logger.warn('Invalid event received');
        return;
      }

      await this.contractEventModel.updateOne(
        {
          transactionHash: eventData.transactionHash,
          logIndex: eventData.logIndex,
        },
        { $setOnInsert: eventData },
        { upsert: true },
      );
    } catch (error) {
      this.logger.error('Failed to save event', error);
    }
  }

  private makeEventData(eventName: ContractEventName, log: any) {
    const args = log.args ?? {};

    return {
      eventName,
      contractAddress: this.contractAddress.toLowerCase(),
      changedBy: args.changedBy?.toLowerCase(),
      oldName: args.oldName,
      oldMobile: args.oldMobile,
      newName: args.newName,
      newMobile: args.newMobile,
      transactionHash: log.transactionHash?.toLowerCase(),
      blockNumber: log.blockNumber?.toString(),
      logIndex: log.logIndex,
    };
  }

  private getStartBlock() {
    const block = this.configService.get<string>('EVENT_START_BLOCK');
    return block ? BigInt(block) : undefined;
  }
}
