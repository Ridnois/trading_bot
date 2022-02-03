import { ethers } from 'ethers'
import Ganache from 'ganache'
import ABI from '../src/ABI'
import * as dotenv from 'dotenv'

const hex = (value: string) => ethers.utils.hexlify(ethers.utils.parseEther(value))

const startChain = async (url = '', pk = '') => {
  const ganache = Ganache.provider({
    chain: { networkId: 1 },
    fork: { url },
    wallet: {
      accounts: [{
        secretKey: `0x${pk}`,
        balance: hex('1000')
      }]
    }
  })

  const provider = new ethers.providers.Web3Provider(ganache as any)
  const wallet = new ethers.Wallet(pk, provider)
  return wallet
}

describe('Liquidity pair', () => {
  let wallet: ethers.Wallet
  let BUSD_ADDRESS = ''
  let WBNB_ADDRESS = ''
  let PANCAKE_FACTORY = ''

  beforeAll(async () => {
    dotenv.config()

    const {
      MAINNET_NODE_URL = '',
      PRIVATE_KEY = ''
    } = process.env

    BUSD_ADDRESS = process.env.BUSD_ADDRESS
    PANCAKE_FACTORY = process.env.PANCAKE_FACTORY
    WBNB_ADDRESS = process.env.WBNB_ADDRESS

    wallet = await startChain(MAINNET_NODE_URL, PRIVATE_KEY)
  })

  test('Fetch pair address', async () => {
    jest.setTimeout(20000)
    const factoryContract = new ethers.Contract(PANCAKE_FACTORY, ABI.factory_abi, wallet)
    console.log(await factoryContract.getPair(BUSD_ADDRESS, WBNB_ADDRESS))
  })
})
