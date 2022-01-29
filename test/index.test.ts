import { ethers } from 'ethers'
import Ganache from 'ganache-core'
import ABI from '../src/ABI'
import * as dotenv from 'dotenv'

const startChain = async (MAINNET_NODE_URL: string, PRIVATE_KEY: string) => {
  const ganache = Ganache.provider({
    fork: MAINNET_NODE_URL,
    network_id: 1,
    accounts: [
      {
        secretKey: Buffer.from(PRIVATE_KEY, 'hex'),
        balance: ethers.utils.hexlify(ethers.utils.parseEther('1000'))
      }
    ]
  })

  const provider = new ethers.providers.Web3Provider(ganache as any)
  const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider)

  return wallet
}

describe('Trading bot', () => {
  let wallet: ethers.Wallet
  let BUSD_ADDRESS: string | undefined
  beforeAll(async () => {
  
    dotenv.config()
    const { MAINNET_NODE_URL = '', PRIVATE_KEY = ''} = process.env
    console.log(PRIVATE_KEY.length)
    BUSD_ADDRESS = process.env.BUSD_ADDRESS
    wallet = await startChain(MAINNET_NODE_URL, PRIVATE_KEY)
  })

  test('BUSD balance of 0', async () => {
    const busdContract = new ethers.Contract(
      BUSD_ADDRESS || '',
      ABI.busd_abi,
      wallet)
    const busdOnWei = await busdContract.balanceOf(wallet.address)
    console.log(busdOnWei.toString())
  })
})
