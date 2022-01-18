const getPrice = (contract) => async (biggerFirst) => {
	const price = await contract.methods.getReserve().call();
	return price
}

const checker = () => {}
const ableToSell = () => {}
module.exports = {
	getPrice,
	checker,
	ableToSell,
}
