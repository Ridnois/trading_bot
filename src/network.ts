import { ethers } from 'ethers'

export const network = (rcp: string) => new ethers.providers.JsonRpcProvider(rcp)

export const contract = (network: ethers.providers.JsonRpcProvider) => (address: string, ABI: ethers.ContractInterface) => new ethers.Contract(address, ABI, network)
