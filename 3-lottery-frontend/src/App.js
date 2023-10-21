import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { manager: "", players: [], balance: "", value: "", message: "" };
  }

  async componentDidMount() {
    // no need to specify to set provider cause using with metamask provider
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    // get balance in lottery contract
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager: manager, players: players, balance: balance});
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting for Transaction Success..." });

    // for curr version of web3 need to specify from in send
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "You have been entered!!" });
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting for Transaction Success..." });

    // for curr version of web3 need to specify from in send
    await lottery.methods.pickWinner().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "A winner has been picked!!" });
  }

  render() {
    web3.eth.getAccounts()
      .then(console.log);

    return (
      <div>
        <h1>Lottery Contract</h1>
        <p>
          This contract is managed by {this.state.manager} There are currently {this.state.players.length} entered and are competing for {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>
        
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to Try your luck?</h4>
          <div>
            <label>Amount of Ether to Enter</label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
