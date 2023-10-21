import Web3 from "web3";

// window not available on server side
// const web3 = new Web3(window.web3.currentProvider);
let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // we are in browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on server or user not has metamask
    const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/7c81d23c69284ae993eeec6ccea765dd'
    ); // make own provider
    web3 = new Web3(provider);
}

export default web3;