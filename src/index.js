const { pancake_factory_abi, pair_abi, WBNB_ABI } = require('./ABI')
const Web3 = require('web3')

require('dotenv').config()

const { WBNB_ADDRESS, BUSD_ADDRESS, PANCAKE_FACTORY } = process.env
const binance = new Web3('https://bsc-dataseed1.binance.org:443')

const networkHandler = (rcp) => {
	return new Web3(rcp)
}

// const binance = networkHandler('https://bsc-dataseed1.binance.org:443')

const contractFactory = (networkHandler) => (abi, address) => new networkHandler.eth.Contract(abi, address)

// const binanceContract = contractFactory(binance)
// const pairFactoryContract = binanceContract(pancake_factory_abi, PANCAKE_FACTORY)

const pairAddressHandler = (pairFactory) => async (token0, token1) => {
	return await pairFactory.methods.getPair(token0, token1).call()
}

// const pancakePairAddress = pairAddressHandler(pairFactoryContract)
// After we get the pair address, we can stop currying
// const myPairAddress = await pancakePairHandler(BUSD_ADDRESS, WBNB_ADDRESS)
// const myPairContract = binanceContract(pair_abi, myPairAddress)

const pairPrice = async (contract, biggerFirst) => {
	const price = await contract.methods.getReserves().call()
	if ( biggerFirst ) {
		return price[0] > price[1] ? price[1] / price[0] : price[0] / price[1]
	}
	return price[0] / price[1]
}

const initBinance = async () => {
	const binance = networkHandler('https://bsc-dataseed1.binance.org:443')
	const binanceContract = contractFactory(binance)
	const pairFactoryContract = binanceContract(pancake_factory_abi, PANCAKE_FACTORY)
	const pairAddress = pairAddressHandler(pairFactoryContract)
	const myPairAddress = await pairAddress(BUSD_ADDRESS, WBNB_ADDRESS)

	const myPairContract = binanceContract(pair_abi, myPairAddress)

	console.log(await pairPrice(myPairContract, true))
}

initBinance()
