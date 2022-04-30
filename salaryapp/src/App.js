import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';

function App() {

  const [walletAddress, setWalletAddress] = useState("");

  // async function requestAcc(){
  //   console.log("Connected");
    
  //   if(window.ethereum){
  //     console.log("Yes");

  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       })
  //       setWalletAddress(accounts[0])
  //     } catch (error) {
  //       console.log("error connecting")
  //     }

  //   } else {
  //     console.log("not detected");
  //   }
  // }

  async function connectWallet() {
    if(window.ethereum){
      console.log("1")
      window.ethereum.request({method: "eth_requestAccounts"})
      .then(result => result[0]);
        alert("connected")
    } else {
      console.log("error");
    }
    // if(typeof window.ethereum !== 'undefiend'){
    //   await requestAcc();

    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    // }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectWallet}>Metamask</button>
      </header>
    </div>
  );
}

export default App;
