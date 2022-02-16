import EventEmitter from 'events'
import { ethers } from 'ethers'
import { pairRate } from './pair'

export const emitter = (eventName: string | symbol, callback: (...args: any[]) => any) => {
  const newEventEmitter = new EventEmitter()

  newEventEmitter.on(eventName, callback)
  // Be able to add more event handling on basic event
  return newEventEmitter
}


export const priceDaemon = async (pair: ethers.Contract, callback: (...args: any[]) => any, recursive = true) => {
  const price = await pairRate(pair, true)
  callback(price)
  if (recursive) {
    priceDaemon(pair, callback, recursive) 
  } 
  
}

