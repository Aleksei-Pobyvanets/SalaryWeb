import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';
import contractABI from '../../salary/artifacts/contracts/salary.sol/salary.json'

function App() {
  const salary = () => {


    const [defaultAccount, setDefaultAccount] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [provider, setProvider] = useState(null);
    const [singer, setSinger] = useState(null);

    async function connectWallet() {
    if(window.ethereum){
      console.log("1")
      window.ethereum.request({method: "eth_requestAccounts"})
      .then(result => result[0]);
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

      let tempContract = new ethers.Contract(,contractABI ,tempSinger)
    }

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
