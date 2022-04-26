import logo from './logo.svg';
import './App.css';

function App() {

  async function reqestAcc() {
    console.log("reqesting account")

    if(window.ethereum) {
      console.log("desited")

      try{
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts)
      } catch (error) {
        console.log("error cant connect")
      }

    } else {
      console.log("Metamask not desited")
    }
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={reqestAcc}>Connect</button>
        <h3>Walet Address ....</h3>
      </header>
    </div>
  );

}

export default App;
