import { ethers } from 'ethers'
import ABI from '../src/ABI'
import * as dotenv from 'dotenv'
import { startChain } from './utility'


describe('Liquidity pair', () => {
  let wallet: ethers.Wallet
  let BUSD_ADDRESS = ''
  let WBNB_ADDRESS = ''
  let PANCAKE_FACTORY = ''
  // We do this because if not, ganache keeps printing every query to the network
  const log = console.log
  beforeAll(async () => {
    dotenv.config()
    console.log = jest.fn()
    const {
      MAINNET_NODE_URL = '',
      PRIVATE_KEY = ''
    } = process.env

    BUSD_ADDRESS = process.env.BUSD_ADDRESS
    PANCAKE_FACTORY = process.env.PANCAKE_FACTORY
    WBNB_ADDRESS = process.env.WBNB_ADDRESS
    wallet = await startChain(MAINNET_NODE_URL, PRIVATE_KEY)
  })

  test('Fetch pair address on existing LP pair', async () => {
    jest.setTimeout(20000)
    log('This test can be slow, please be patient.')
    const pairAddress = '0x1B96B92314C44b159149f7E0303511fB2Fc4774f'
    const factoryContract = new ethers.Contract(PANCAKE_FACTORY, ABI.factory_abi, wallet)
    const result = await factoryContract.getPair(BUSD_ADDRESS, WBNB_ADDRESS)
    
    expect(result).toBe(pairAddress)
  })

  test('fetch pair address on non existing LP pair', async() => {
    const factoryContract = new ethers.Contract(PANCAKE_FACTORY, ABI.factory_abi, wallet)
    const mneb_address = '0xd22202d23fe7de9e3dbe11a2a88f42f4cb9507cf'
    const nftb_address = '0xde3dbbe30cfa9f437b293294d1fd64b26045c71a'

    const expected = ethers.constants.AddressZero
    const result = await factoryContract.getPair(mneb_address, nftb_address)

    expect(result).toBe(expected)
  })
})
