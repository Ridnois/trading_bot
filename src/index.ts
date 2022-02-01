import { JsonRpcProvider } from '@ethersproject/providers'
import * as dotenv from 'dotenv'
import { ethers, ContractInterface, Contract, Wallet } from 'ethers'
import ABI from './ABI'

dotenv.config()

const {
  MAINNET_NODE_URL,
  PRIVATE_KEY,
  PANCAKE_FACTORY,
  WBNB_ADDRESS,
  BUSD_ADDRESS, 
} = process.env


/**
 * @description handle connection with Web3 at given node rcp.
 * you can have a handler for each EVM compatible blockchain
 * @param rcp: node rcp direction, default binance mainnet
 */
export const provider = (rcp = MAINNET_NODE_URL) => new ethers.providers.JsonRpcProvider(rcp)
/**
 * @description wallet handler, handle each network by separate
 * @param provider: network provider 
 */
export const wallet = (provider: JsonRpcProvider) => (pk: string) => new ethers.Wallet(Buffer.from(pk, 'hex'), provider)

export const contract = (provider: JsonRpcProvider | Wallet ) => (abi: ContractInterface, address: string) => new ethers.Contract(address, abi, provider)

/*
 * @description utility function for 
 **/
export const pairRate = async (contract: Contract, ordered = false) => {
  const price = await contract.getReserves()
  let [ token0, token1 ] = price
  token0 = token0.toString()
  token1 = token1.toString()
  return [token0, token1]
}

const binance = provider(MAINNET_NODE_URL)
// Handle this through cli or rest if you like
const binanceWallet = wallet(binance)
const myBinanceWallet = binanceWallet(PRIVATE_KEY)



const binanceContract = contract(binance)

const pancakeFactoryContract = binanceContract(ABI.factory_abi, PANCAKE_FACTORY)

const init = async () => {
  const pairAddress = await pancakeFactoryContract.getPair(WBNB_ADDRESS, BUSD_ADDRESS)
  const myPair = binanceContract(ABI.pair_abi, pairAddress)
  
  console.log(await pairRate(myPair))
}

//init()
