import * as dotenv from 'dotenv'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { pancake_factory_abi } from './ABI'

dotenv.config()

const { PANCAKE_FACTORY } = process.env

const web3Handler = (rcp: string) => new Web3(rcp)

const contract = (web3Handler: Web3) => (abi: AbiItem[], address: string | undefined) => new web3Handler.eth.Contract(abi, address)

const binance = web3Handler('https://bsc-dataseed1.binance.org:443/')
const binanceContract = contract(binance)
const pancakeFactory = binanceContract(pancake_factory_abi, PANCAKE_FACTORY)

const pairAddressHandler = (pairFactory: any) => async (token0: string, token1: string) => await pairFactory.methods.getPair(token0, token1).call()


