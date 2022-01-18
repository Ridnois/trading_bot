const contract = (web3) => (abi, address) => {
	return new web3.eth.Contract(abi, address)
}

const estimateGas = (web3) => (contractAddress) => (acc, data, cb ) => {
	web3.eth.estimateGas({
		from: acc,
		data: data,
		to: contractAddress
	}, function(error, estimatedGas) {
		if (err) {
			console.log(err)
		}
		console.log(estimatedGas)
		cb(estimatedGas, error)
	})
}

const estimateSwapGas = (web3) => (recipient, from, amount) => {
	const func = 'transfer(address, uint256)'
	const methodSignature = web3.eth.abi.encodeFunctionSignature(func)

	const encodedParameter = web3.eth.abi.encodeParameter('uint256', amount)
	const encodedRecipient = web3.eth.abi.encodeParameter('address', recipient)

	const data = methodSignature + encodedRecipient + encodedParameter
	console.log(data)
}
module.exports = {
	contract,
	estimateGas,
	estimateSwapGas,
}
