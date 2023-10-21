import web3 from "./web3";
import CampaingFactory from "./build/CampaginFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaingFactory.interface),
    "0x84D82Ecf2c8DcE781eC151F8FF6e60fC08b4489c"
);

export default instance;