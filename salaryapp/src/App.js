import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';

function App() {

  async function requestAcc(){
    console.log("Connected");
    
    if(window.ethereum){
      console.log("Yas");
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
