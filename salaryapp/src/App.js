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
    const [data, setData] = useState(null);

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
      
      const takeHexSalForHour = checkContract.salForHour.toHexString()
      const takeHexWorked = checkContract.workedHours.toHexString()
      const takeHexWorkerName = checkContract.workerName
      const takeHexWorkerAddr = checkContract.worker

      const takeHexSalForNumb = parseInt(takeHexSalForHour)
      const takeHexWorkedToNumb = parseInt(takeHexWorked)

      console.log(checkContract)
      console.log(takeHexSalForNumb, takeHexWorkedToNumb ,takeHexWorkerName, takeHexWorkerAddr ,"testttttt")

      setData({
        nameWor: takeHexWorkerName,
        addrWork: takeHexWorkerAddr,
        salFor: takeHexSalForNumb,
        workedH: takeHexWorkedToNumb
      })
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

  return (
    <div className="App">
      <header className="App-header">
        <div className='firstDiv'>
          <h3>Your address: {defaultAccount}</h3>
          <button onClick={connectWalletHandler}>Connect Metamask</button>
        </div>
        <button onClick={chackBal}>Check current balance</button>
        <div className='inputs'>
          <div className='pInputDiv'> <input className='inputsP' type="text" id='name' placeholder="enter something"></input> </div>
          <div className='pInputDiv'> <input className='inputsP' type="number" id='salforhour' placeholder="enter salary"></input> </div>
          <div className='pInputDiv'> <input className='inputsP' type="address" id='addr' placeholder="enter  address"></input> </div>
          <div className='pInputDiv'> <input className='inputsP' type="number" id='workedhour' placeholder="enter worked hours"></input> </div>
            <div>
            <button className='btnInputsP' onClick={sendWorker}>send</button>
          </div>
        </div>
        <div>
          <input type="number" id="inputIndex"></input>
          <button onClick={checkCon}>Check</button>
          <div className='blockOfWorkers'> 
            <div className='warkedBlock'>
              <p className='pWorker'>{data?.nameWor}</p>
            </div>
            <div className='warkedBlock'>
              <p className='pWorker'>{data?.addrWork}</p>
            </div>
            <div className='warkedBlock'>
                <p className='pWorker'>{data?.salFor}</p>
            </div>
            <div className='warkedBlock'>
                <p className='pWorker'>{data?.workedH}</p>
            </div>
          </div>
        </div>
        <div>
          <button onClick={PaySal}>Pay</button>
        </div>
        <button onClick={rename}>rename</button>
        <div className='inputs'>
          <input type="number" id='indexNaneNumb'></input>
          <input type="text" id='indexName'></input>
        </div>
      </header>
    </div>
  );
}

export default App;
