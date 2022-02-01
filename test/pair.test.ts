import { ethers } from 'ethers'
import Ganache from 'ganache'
import ABI from '../src/ABI'
import * as dotenv from 'dotenv'

const hex = (value: string) => ethers.utils.hexlify(ethers.utils.parseEther(value))

const mainnetFork = async (url = '', pk = '') => {
  const ganache = Ganache.provider({
    chain: { networkId: 1 },
    fork: { url },
    wallet: {
      accounts: [
        {
          balance: hex('1000'),
          secretKey: `0x${pk}` 
        }
      ]
    }
  }) 

  const provider = new ethers.providers.Web3Provider(ganache as any)
  return provider
}


describe('LP pair', () => {
  let PANCAKE_FACTORY = ''
  const BUSD_ADDRESS = ''
  const WBNB_ADDRESS = ''
  let provider: ethers.providers.Web3Provider
  
  beforeAll(async () => {
    dotenv.config()
    const { MAINNET_NODE_URL, PRIVATE_KEY } = process.env
    PANCAKE_FACTORY = process.env.PANCAKE_FACTORY
    provider = await mainnetFork(MAINNET_NODE_URL, PRIVATE_KEY)
  })

  test('Get factory address from enviroment', async () => {
    const factoryContract = new ethers.Contract(PANCAKE_FACTORY, ABI.factory_abi)
    console.log(factoryContract.address)
  })
})
