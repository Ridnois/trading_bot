import { ethers } from 'ethers'
import Ganache from 'ganache'

export const hex = (value: string) => ethers.utils.hexlify(ethers.utils.parseEther(value))

export const startChain = async (url = '', pk = '') => {
  const ganache = Ganache.provider({
    chain: { networkId: 1 },
    fork: { url },
    wallet: {
      accounts: [{
        secretKey: `0x${pk}`,
        balance: hex('1000')
      }]
    }
  })

  const provider = new ethers.providers.Web3Provider(ganache as any)
  const wallet = new ethers.Wallet(pk, provider)
  return wallet
}
