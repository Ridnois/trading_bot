const balanceOf = async (contract, address) => {
	return await contract.methods.balanceOf(address).call()
}

const getOwner = async (contract) => {
	return await contract.methods.getOwner().call()
}

module.exports = {
	balanceOf,
	getOwner,
}
