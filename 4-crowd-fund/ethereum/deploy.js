const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require("./build/CampaginFactory.json");
// const compiledCampaign = require("./build/Campagin.json");


const provider = new HDWalletProvider(
  'movie bulk baby session forward cradle twin nice kitchen ship lyrics art',
  'https://sepolia.infura.io/v3/7c81d23c69284ae993eeec6ccea765dd'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  //console.log(compiledFactory.interface);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
