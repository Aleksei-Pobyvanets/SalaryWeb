import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';

function App() {

  async function requestAcc(){
    console.log("Connected");
    
    if(window.ethereum){
      console.log("Yes");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        console.log(accounts)
      } catch (error) {
        console.log("error connecting")
      }

    } else {
      console.log("not detected");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAcc}>Metamask</button>
        <h3>Connected</h3>
      </header>
    </div>
  );
}

export default App;
