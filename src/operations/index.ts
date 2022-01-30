import { ethers } from 'ethers'
import Ganache from 'ganache-core'

const provider = (url: string) => {
  new ethers.providers.JsonRpcProvider(url)
}
