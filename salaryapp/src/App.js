import React, {useState} from 'react'
import './App.css';
import { ethers } from 'ethers';
import contractABI from './contractABI.json';

function App() {

    const contractAddr = '0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25';

    const [defaultAccount, setDefaultAccount] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");

    const [provider, setProvider] = useState(null);
    const [singer, setSinger] = useState(null);
    const [contract, setContract] = useState(null);

    async function connectWalletHandler() {
    if(window.ethereum){
      console.log("1")
      window.ethereum.request({method: "eth_requestAccounts"})
      .then(result => {
        accountChanged(result[0])
        
      });
        alert("connected")
    } else {
      console.log("error");
    }
  }

    const accountChanged = (newAccount) => {
      setDefaultAccount(newAccount);
      updateEthers();
  }

    const updateEthers = () => {
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);

      let tempSinger = tempProvider.getSigner();
      setSinger(tempSinger);

      let tempContract = new ethers.Contract(contractAddr, contractABI ,tempSinger);
      setContract(tempContract);
    }


  

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectWalletHandler}>Metamask</button>
        <h3>Address {defaultAccount}</h3>
      </header>
    </div>
  );
}

export default App;
