import dotenv from 'dotenv'
dotenv.config();
import { createPublicClient, formatEther, http } from 'viem';
import type {Hex} from 'viem'
import {privateKeyToAccount}from 'viem/accounts';
import {hoodi} from 'viem/chains'
const privateKey = process.env.HOODI_PRIVATE_KEY;

const account = privateKeyToAccount(privateKey as Hex);

const rpcUrl = process.env.HOODI_RPC_URL;

(async () => {
    try {
        const client = createPublicClient({
            chain: hoodi,
            transport: http(rpcUrl)
        });

        const balance = await client.getBalance({
            address: account.address
        });
        console.log("Balance:",formatEther(balance));

        const nonce = await client.getTransactionCount({
            address:account.address
        })

        console.log("Nonce:",nonce);
        
        
    } catch (error) {
        console.error(error);
    }
})();