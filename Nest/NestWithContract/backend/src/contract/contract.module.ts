import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import {
  ContractEvent,
  ContractEventSchema,
} from './schemas/contract-event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContractEvent.name, schema: ContractEventSchema },
    ]),
  ],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
