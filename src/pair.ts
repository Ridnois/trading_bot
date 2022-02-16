import { ethers } from 'ethers'

export const pairAddress = (factory: ethers.Contract) => async (token0: string, token1: string) => {
  return await factory.getPair(token0, token1)
}

export const pairFactory = (network: ethers.providers.JsonRpcProvider, ABI: ethers.ContractInterface) => (address: string) => {
  return new ethers.Contract(address, ABI, network)
}

export const pairRate = async (pair: ethers.Contract, ordered: boolean) => {
  const [token0, token1] = await pair.getReserves()

  if (ordered) {
    return token0 > token1 ? token1 / token0 : token0 / token1
  }

  return token0 / token1
}
