import { ethers } from 'ethers'
import Ganache from 'ganache'
import ABI from '../src/ABI'
import * as dotenv from 'dotenv'

const startChain = async (MAINNET_NODE_URL: string, PRIVATE_KEY: string) => {

  const ganache = Ganache.provider({
    chain: { networkId: 1 },
    fork: { url: MAINNET_NODE_URL },
    wallet: {
      accounts: [
        {
          secretKey: `0x${PRIVATE_KEY}`,
          balance: ethers.utils.hexlify(ethers.utils.parseEther('1000'))
        }
      ]
    }
  })

  const provider = new ethers.providers.Web3Provider(ganache as any)
  const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider)

  return wallet
}

describe('Trading bot', () => {
  let wallet: ethers.Wallet
  let BUSD_ADDRESS: string | undefined
  let log: any;
  beforeAll(async () => {
    log = console.log
    console.log = jest.fn() 
    dotenv.config()
    const { MAINNET_NODE_URL = '', PRIVATE_KEY = ''} = process.env
    BUSD_ADDRESS = process.env.BUSD_ADDRESS
    wallet = await startChain(MAINNET_NODE_URL, PRIVATE_KEY)
  })

  test('BUSD balance of 0', async () => {
    jest.setTimeout(20000)
    const busdContract = new ethers.Contract(
      BUSD_ADDRESS || '',
      ABI.busd_abi,
      wallet)

    log(await busdContract.name())
    const busdOnWei = await busdContract.balanceOf(wallet.address)
    expect(busdOnWei.toString()).toBe('0')
  })
})
