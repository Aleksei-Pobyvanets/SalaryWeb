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
          <input type="text" name=""></input>
          <input type="text" name=""></input>
          <input type="text" name=""></input>
          <input type="text" name=""></input>
        </div>
      </header>
      {/* {currentContractVal} */}
    </div>
  );
}

export default App;
