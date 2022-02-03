/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: 'https://bsc-dataseed.binance.org'
      }
    }
  },
  solidity: '0.7.3',
};
