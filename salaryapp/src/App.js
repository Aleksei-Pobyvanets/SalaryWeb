import React, {useState} from 'react'
import './App.css';
import { ethers } from 'ethers';
import contractABI from './contractABI.json';

function App() {

    const contractAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    const [defaultAccount, setDefaultAccount] = useState(null);
    // const [walletAddress, setWalletAddress] = useState("");
    // const [currentContractVal, setCurrentContractVal] = useState(null);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    async function connectWalletHandler() {
    if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
			})

		} else {
			console.log('Need to install MetaMask');
		}

  }

    const accountChangedHandler = (newAccount) => {
      setDefaultAccount(newAccount);
      updateEthers();
  }

    const updateEthers = () => {
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);

      let tempSigner = tempProvider.getSigner();
      setSigner(tempSigner);

      let tempContract = new ethers.Contract(contractAddr, contractABI ,tempSigner);
      setContract(tempContract);
    }

    // const setHandler = (event) => {
    //   event.preventDefault();
    //   console.log(event.target.setVal.value);
    //   contract.set(event.target.setVal.value);
    // }

    const chackBal = async () =>{
      let Sigval = await signer.getBalance();
      const Conval = await provider.getBalance(contractAddr);

      const colcul = 1e18;
      console.log(Sigval.toString() / colcul);
      console.log(Conval.toString() / colcul);
    }
  
    async function sendWorker() {
      console.log(document.getElementById("name").value) 
      let nameData = document.getElementById("name").value
      console.log(document.getElementById("salforhour").value) 
      let salforhourData = document.getElementById("salforhour").value
      console.log(document.getElementById("addr").value) 
      let addrData = document.getElementById("addr").value
      console.log(document.getElementById("workedhour").value) 
      let workedhourData = document.getElementById("workedhour").value

      const transmit = await contract.createWorkersSal(nameData, salforhourData, addrData , workedhourData)
    }
    async function ch(){
      const fk = await contract.chackEther();
      console.log(fk)
    }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={connectWalletHandler}>Metamask</button>
          <h3>Address {defaultAccount}</h3>
        </div>
        {/* <form onSubmit={setHandler}>
          <button type={"submit"}>Check current balance</button>
          <h3 id='setVal'>Balanse</h3>
        </form> */}
        <button onClick={chackBal}>Check current balance</button>
        <div className='inputs'>
          <input type="text" id='name' className='name' name="Name"></input>
          <input type="text" id='salforhour' name="salary for one hour"></input>
          <input type="text" id='addr' name="wallet address"></input>
          <input type="text" id='workedhour' name="worked hours"></input>
        </div>
        <div>
          <button onClick={sendWorker}>send</button>
        </div>
      </header>
      {/* {currentContractVal} */}
    </div>
  );
}

export default App;
