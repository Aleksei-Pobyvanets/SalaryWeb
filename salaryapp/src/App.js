import React, {useState} from 'react'
import './App.css';
import { ethers } from 'ethers';
import contractABI from './contractABI.json';
import { BlockForkEvent } from '@ethersproject/abstract-provider';

function App() {

    const contractAddr = '0x5c74c94173F05dA1720953407cbb920F3DF9f887';

    const [defaultAccount, setDefaultAccount] = useState(null);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [data, setData] = useState(null);
    const [doneCalc, setCalc] = useState(null);

    async function connectWalletHandler() {
    if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
			})
      const mainDivId = document.getElementById('mainDiv').style.display = "block"
      const firstDivHello1 = document.getElementById('firstDivHello').style.display = "none"
      const firstDivH31 = document.getElementById('firstDivH3').style.display = "block"
      const firstDiv1 = document.getElementById('firstDivId').style.display = "none"
      
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
      const doneColc = Conval.toString() / colcul

      setCalc(doneColc);

      console.log(Sigval.toString() / colcul);
      console.log(doneColc);
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

    async function pasetAllWorkers() {

      const countVal = await contract.count()
      const countVal1 = countVal.toHexString()
      const countVal2 = parseInt(countVal1)  

      if(countVal2 >= 0) {
        console.log(countVal2)

        for(let i = 0; i < countVal2; i++){
          const checkContract = await contract.sals(i);
          
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

      }else{
        console.log("You have 0 workers!")
      }
    }

  return (
    <div className="App">

      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <div class="content">
      <header className="App-header">

      <div className='firstDiv' id='firstDivId'>
        <h1 id="firstDivHello">Hello, connect your Metamask!</h1>
        <h3 id="firstDivH3">Your address: {defaultAccount}</h3>
        <button className="button-85" onClick={connectWalletHandler} role="button">Connect Metamask</button>
      </div>

      <div id='mainDiv'>
   
        <div className='balanceDiv'>
          <button onClick={chackBal} className="button1">Check current balance</button>
          <h1 className='balanceH1'>{doneCalc}</h1>
        </div>
        
        <div className='inputs'>
          <div className='pInputDiv'> <input className='inputsP' type="text" id='name' placeholder="enter something"></input> </div>
          <div className='pInputDiv'> <input className='inputsP' type="number" id='salforhour' placeholder="enter salary"></input> </div>
          <div className='pInputDiv'> <input className='inputsP' type="address" id='addr' placeholder="enter  address"></input> </div>
          <div className='pInputDiv'> <input className='inputsP' type="number" id='workedhour' placeholder="enter worked hours"></input> </div>
            <div>
            <button  className='btnInputsP' onClick={sendWorker}>send</button>
          </div>
        </div>

        <div>

          <div className='checkWorker'>
            <input type="number" id="inputIndex"></input>
            <button onClick={checkCon}>Check</button>
          </div>

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

        <button onClick={pasetAllWorkers}></button>

        {pasetAllWorkers}

      </div>

      </header>
      </div>


    </div>
  );
}

export default App;
