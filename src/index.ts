import * as dotenv from 'dotenv'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import ABI from './ABI'

dotenv.config()

const { PANCAKE_FACTORY,
	WBNB_ADDRESS,
	BUSD_ADDRESS,
	} = process.env

type fromEnv = string | undefined

const rcpHandler = (rcp: string) => new Web3(rcp)

const contractFactory = (rcpHandler: Web3) => (abi: AbiItem[], address: fromEnv) => new rcpHandler.eth.Contract(abi, address)

const pairAddressHandler = (pairFactory: any) => async (token0: fromEnv, token1: fromEnv) => { 
	return await pairFactory.methods.getPair(token0, token1).call()
}

const pairPrice = async (contract: any, ordered: boolean = false) => {
    const price = await contract.methods.getReserves().call()
    const [ token0, token1 ] = await price

    if (ordered) {
        return token0 > token1 ? token1 / token0 : token0 /token1
    }

    return token0 / token1
}

const initBinance = async () => {
	const binance = rcpHandler('https://bsc-dataseed1.binance.org:443')
	const binanceContract = contractFactory(binance)
	const pairFactoryContract = binanceContract(ABI.factory_abi as AbiItem[], PANCAKE_FACTORY)
	const pairAddress = pairAddressHandler(pairFactoryContract)

	const myPairAddress = await pairAddress(WBNB_ADDRESS, BUSD_ADDRESS)
	const myPair = binanceContract(ABI.pair_abi as AbiItem[], myPairAddress)

    console.log(await pairPrice(myPair, true))
}

initBinance()
