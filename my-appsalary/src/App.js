import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      <button onClick={async () => {
        alert("Connected");
        if(window.ethereum){
            
        }
      }}>

      </button>

      </header>
    </div>
  );
}

export default App;
