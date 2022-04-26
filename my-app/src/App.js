import logo from './logo.svg';
import { useState } from 'react';

import './App.css';

function App() {



  const [walletAddr, satWalletAddr] = useState("")

  async function reqestAcc() {
    console.log("reqesting account")

    async function connectWallet() {
        if(typeof window.ethereum != "udefined"){
          await reqestAcc();

          const provider = new ethers.providers.Web3Provider(window.ethereum)
        }
    }

    if(window.ethereum) {
      console.log("desited")
        try{
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          satWalletAddr(accounts[0]);
        } catch (error) {
          console.log("error cant connect")
        }
    } else {
      console.log("Metamask not desited")
    }
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={reqestAcc}>Connect</button>
        <h3>Walet Address {walletAddr}</h3>
      </header>
    </div>
  );

}

export default App;
