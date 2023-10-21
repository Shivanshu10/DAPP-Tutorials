const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaginFactory.json");
const compiledCampaign = require("../ethereum/build/Campagin.json");

let accounts;
let factory;
let campaignAddress;
let campagin;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: "1000000" });

    await factory.methods.createCampagin("100").send({
        from: accounts[0],
        gas: "1000000"
    });

    const addresses = await factory.methods.getDeployedContracts().call();
    campaignAddress = addresses[0];
    campagin = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    )
});

describe("Campaigns", () => {
    it("deploys a factory and a campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campagin.options.address);
    });

    it("marks the Caller as Campaign manager", async () => {
        const manager = await campagin.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it("allows people to contribute and marks them as approvers", async () => {
        await campagin.methods.contribute().send({
            value: 200, 
            from: accounts[1]
        });

        const isContributor = await campagin.methods.approvers(accounts[1]).call();

        assert(isContributor);
    });

    it("Campaign accepts atleast minimum contribution", async () => {
        try {
            await campagin.methods.contribute().send({
                value: "5",
                from: accounts[1]
            })
            assert(false);
        } catch(err) {
            assert(err);
        }
    });

    it("Allows manager to make payment request", async () => {
        await campagin.methods
            .createRequest("Buy Batteries", "100", accounts[2])
            .send({
                from: accounts[0],
                gas: "1000000"
            });
        const request = await campagin.methods.requests(0).call();

        assert.equal("Buy Batteries", request.description);
    });

    it("processes requests", async () => {
        await campagin.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei("10", "ether")
        });

        await campagin.methods
            .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
            .send({ from: accounts[0], gas: "1000000" });

        await campagin.methods.approveRequest(0).send({ 
            from: accounts[0], gas: "1000000" 
        });

        await campagin.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, "ether");
        balance = parseFloat(balance);
        //console.log(balance);
        assert(balance > 104);
    })
});