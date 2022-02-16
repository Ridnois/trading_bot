import { contract, network } from './network'
import { emitter, priceDaemon } from './daemon'
import { pairAddress, pairFactory, pairRate } from './pair'
import { reached } from './utils'
import ABI from './ABI'
import * as dotenv from 'dotenv'

dotenv.config()

const {
  MAINNET_NODE_URL = '',
  PRIVATE_KEY = '',
  WBNB_ADDRESS = '',
  BUSD_ADDRESS = '',
  PANCAKE_FACTORY = '',
} = process.env

const binance = network(MAINNET_NODE_URL)
const binanceContract = contract(binance)

const pancakeFactory = binanceContract(PANCAKE_FACTORY, ABI.factory_abi)
const pancakePairFactory = pairFactory(binance, ABI.pair_abi)
const pancakePairAddress = pairAddress(pancakeFactory)

const init = async () => {
  const address = await pancakePairAddress(WBNB_ADDRESS, BUSD_ADDRESS)
  const pairContract = pancakePairFactory(address)
  const operateAt = (expected: number) => async (price: number) => {
    if (reached(price, expected)) {
      console.log('Must sell')
    } else {
      console.log('Not yet my friend')
    }
  } 
  const priceHandler = emitter('price-check', async (price) => {
     const operator = operateAt(428)
     await operator(price)
  })
  priceDaemon(pairContract, (price) => {
    priceHandler.emit('price-check', price)
  })
}
init()

