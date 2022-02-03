import { ethers } from 'ethers'
import ABI from '../src/ABI'
import * as dotenv from 'dotenv'
import { startChain } from './utility'

describe('Transactions', () => {
  let wallet: ethers.Wallet
  let BUSD_ADDRESS = ''
  let WBNB_ADDRESS = ''
  let PRIVATE_KEY = ''
  let PANCAKE_FACTORY = ''

  const log = console.log

  beforeAll(async () => {
    dotenv.config()
    console.log = jest.fn()
    
    const { MAINNET_NODE_URL = '' } = process.env
    PANCAKE_FACTORY = process.env.PANCAKE_FACTORY
    PRIVATE_KEY = process.env.PRIVATE_KEY
    BUSD_ADDRESS = process.env.BUSD_ADDRESS
    WBNB_ADDRESS = process.env.WBNB_ADDRESS
    wallet = await startChain(MAINNET_NODE_URL, PRIVATE_KEY)
  })

  test('Add WBWB Balance to my address', async () => {
    jest.setTimeout(20000)
    const { address } = wallet 
    const wbnbContract = new ethers.Contract(WBNB_ADDRESS, ABI.wbnb_abi, wallet)
    
    console.time('Deposit BNB into Smart contract')
    await wbnbContract.deposit({value: ethers.utils.parseEther('1')})
    console.timeEnd('Deposit BNB into Smart contract')
    const expected = ethers.utils.parseEther('1')
    console.time('Query balance')
    const result = (await wbnbContract.balanceOf(address))
    console.timeEnd('Query balance')
    expect(result.toString()).toBe(expected.toString())
  })
  
  // We're going to continue with this tests after implementing
  // pancakeswap-sdk
  test.skip('Exchange WBWB for BUSD', async () => {
    jest.setTimeout(20000)

    const { address } = wallet;
    const routerAddress = process.env.PANCAKE_ROUTER || ''
    
    const routerContract = new ethers.Contract(routerAddress, ABI.router_abi, wallet)
  
    console.time('Swap tokens')
    console.timeEnd('Swap tokens')
  })
})
