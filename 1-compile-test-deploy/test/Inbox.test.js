const { Web3 } = require('web3');
const ganache = require('ganache');
const assert = require("assert");
const { interface, bytecode } = require("../compile");
const web3 = new Web3(ganache.provider());

const initialMessage = "Hi There!!";

let accounts;
let inbox;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    // console.log(accounts);

    // pass constrcutor args for creating Contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode,  arguments: [initialMessage] })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
    it("It deploys a contract", () => {
        assert.ok(inbox.options.address);
    });

    it("has a default message", async () => {
        // since no modification of data in blockchain use call
        // call message func of contract
        // in message bracket to pass arg to func
        // in call bracket customize transaction send to network
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage);
    });

    it("can change the message", async () => {
        const newMessage = "Byye";
        // since modifing something on blockchain need send and pay
        await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });

        const message = await inbox.methods.message().call();
        assert.equal(message, newMessage);
    })
})