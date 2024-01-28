/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-foundry");
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/gOEG6nxFQnxzYicQwIFh6lpoJh--vYx4",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      polygon: `${process.env.POLYGONSCAN_API_KEY}`,
    },
    customChains: [
      {
        network: "polygon",
        chainId: 80001,
        urls: {
          apiURL: "https://api-testnet.polygonscan.com/api",
          browserURL: "https://mumbai.polygonscan.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};
