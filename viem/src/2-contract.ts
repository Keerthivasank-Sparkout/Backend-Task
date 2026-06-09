import dotenv from 'dotenv'
import { createWalletClient, http, publicActions } from 'viem'
import type {Hex} from 'viem'
dotenv.config()
import { privateKeyToAccount } from 'viem/accounts'
import { hoodi } from 'viem/chains'
import ContactAbi from '../artifacts/contact.json' with { type: 'json' }

const { abi, bin } = ContactAbi["contracts"]["contract/contact.sol:MyContact"]
const privateKey = process.env.HOODI_PRIVATE_KEY

const account = privateKeyToAccount(privateKey as Hex);

(async () => {
    try {
        const client = createWalletClient({
            account,
            chain: hoodi,
            transport: http(process.env.HOODI_RPC_URL)
        }).extend(publicActions)

        const hash = await client.deployContract({
            abi,
            bytecode: `0x${bin}`,
            args: ["Keerthi", "1234567890"]
        })

        console.log("Deploy tx:", hash)

        const receipt = await client.waitForTransactionReceipt({
            hash
        })

        console.log("Contract:", receipt.contractAddress)

        const name = await client.readContract({
            address: receipt.contractAddress!,
            abi,
            functionName: "getUserDetails"
        })

        console.log("Stored name:", name)
    }
    catch (error) {
        console.log(error);

    }
})()