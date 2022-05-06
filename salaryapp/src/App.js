import React, {useState} from 'react'
import './App.css';
import { ethers } from 'ethers';
import contractABI from './contractABI.json';

function App() {

    const contractAddr = '0x0E801D84Fa97b50751Dbf25036d067dCf18858bF';

    const [defaultAccount, setDefaultAccount] = useState(null);
    // const [walletAddress, setWalletAddress] = useState("");
    // const [currentContractVal, setCurrentContractVal] = useState(null);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    // const [contractInfo, setContractInfo] = useState({
    //   workerName: "-",
    //   worker: "-",
    //   salForHour: "-",
    //   workedHours: "-"
    // })

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

    const chackBal = async () =>{
      let Sigval = await signer.getBalance();
      const Conval = await provider.getBalance(contractAddr);

      const colcul = 1e18;
      console.log(Sigval.toString() / colcul);
      console.log(Conval.toString() / colcul);
    }
  
    async function sendWorker() {
      console.log(document.getElementById("name").value) 
      let nameData = await document.getElementById("name").value

      console.log(parseInt(document.getElementById("salforhour").value)) 
      let salforhourData = parseInt(document.getElementById("salforhour").value)
      let gg = ethers.BigNumber.from(salforhourData)
      
      console.log(document.getElementById("addr").value) 
      let addrData = await document.getElementById("addr").value

      console.log(parseInt(document.getElementById("workedhour").value))
      let workedhourData = await parseInt(document.getElementById("workedhour").value)

      const transmit = await contract.createWorkersSal(nameData, gg, addrData , workedhourData)
    }
  

    async function checkCon() {
      const inputIndexForCheck = document.getElementById("inputIndex").value
      const checkContract = await contract.sals(inputIndexForCheck);
      
      const takeHex = checkContract.salForHour.toHexString()
      const takeHexWorked = checkContract.workedHours.toHexString()

      const takeHexToNumb = parseInt(takeHex)
      const takeHexWorkedToNumb = parseInt(takeHexWorked)
      console.log(checkContract)
      console.log(takeHexToNumb, takeHexWorkedToNumb , "testttttt")


      // setContractInfo({
      //   workerName,
      //   worker,
      //   salForHour: takeHexToNumb,
      //   workedHours: takeHexWorkedToNumb
      // })
    }

    async function PaySal() {
      const pay = await contract.paySal();
      console.log("payad salary")
    }

    async function rename(){
      console.log(document.getElementById("indexNaneNumb").value) 
      let indexNaneNumb = await document.getElementById("indexNaneNumb").value

      console.log(document.getElementById("indexName").value) 
      let indexName = await document.getElementById("indexName").value

      const oldName = await contract.checkWorkersName(indexNaneNumb)
      console.log(oldName)
      const ren = await contract.rename(indexNaneNumb, indexName)
    }

    

    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     name: takeHexToNumb
    //   };
    // }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={connectWalletHandler}>Metamask</button>
          <h3>Address {defaultAccount}</h3>
        </div>
        <button onClick={chackBal}>Check current balance</button>
        <div className='inputs'>
          <input type="text" id='name'></input>
          <input type="number" id='salforhour'></input>
          <input type="address" id='addr'></input>
          <input type="number" id='workedhour'></input>
        </div>
        <div>
          <button onClick={sendWorker}>send</button>
              <input type="number" id="inputIndex"></input>
          <button onClick={checkCon}>Check</button>
        </div>
        <div>
          <button onClick={PaySal}>Pay</button>
        </div>
        <button onClick={rename}>rename</button>
        <div className='inputs'>
          <input type="number" id='indexNaneNumb'></input>
          <input type="text" id='indexName'></input>
        </div>
        {/* <div>
          {checkCon}
        </div> */}
      </header>
    </div>
  );
}

export default App;
