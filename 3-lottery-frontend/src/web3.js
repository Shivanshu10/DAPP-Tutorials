import Web3 from "web3";

window.ethereum.request({ method: "eth_requestAccounts" });

const secret = "movie bulk baby session forward cradle twin nice kitchen ship lyrics art"

// get metamask web3 provider and set it in ur own web3
const web3 = new Web3(window.ethereum);
 
export default web3;