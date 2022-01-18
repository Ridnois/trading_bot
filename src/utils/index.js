const { contract, estimateGas, estimateSwapGas } = require('./contract')
const { balanceOf, getOwner } = require('./erc20')
const { checker, ableToSell, getPrice } = require('./checkers')

const getPairAddress = (factory) => async (token0, token1) => {
	return await factory.methods.getPair(token0, token1).call()
}

module.exports = {
	getPairAddress,
	contract,
	balanceOf,
	getOwner,
	estimateSwapGas,
	checker,
	ableToSell,
	getPrice,
}
