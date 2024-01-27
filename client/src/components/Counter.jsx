import { useState } from "react"
import Counter from "./Counter.sol/Counter.json"
const ethers = require("ethers")

export default function CounterApp() {
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    const [value, setValue] = useState();


    const IncrementHandler = async () => {
        try {
          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const Signer = provider.getSigner();
    
            const Contract = new ethers.Contract(contractAddress, Counter.abi, Signer);
    
            const Tx = await Contract.increment();
            const TxRecit = await Tx.wait();
            console.log('after :', TxRecit);
          } else {
            console.error(
              'MetaMask not found. Please install MetaMask to use this application.',
            );
          }
        } catch (error) {
          console.log(error);
          alert(error);
        }
      };

      const ConvertValue = () => {
        const temp = ethers.BigNumber.from(value).toNumber();
        setValue(temp);
      };

      const ReadContractValue = async () => {
        try {
          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const Signer = provider.getSigner();
    
            // Create a new instance of the Contract class
            const Contract = new ethers.Contract(contractAddress, Counter.abi, Signer);
    
            // Call the getValue function from the contract
            const Tx = await Contract.number();
            console.log('Tx :', Tx);
    
            setValue(Tx._hex);
          } else {
            console.error(
              'MetaMask not found. Please install MetaMask to use this application.',
            );
          }
        } catch (error) {
          console.log(error);
          alert(error);
        }
      };

      return (
        <>

        <div className="valueContainer">
          <p className="key">
            Value: <span>{value ?? ''}</span>
          </p>

          <button onClick={ConvertValue} className="btn" disabled={!value}>
            deCode
          </button>
        </div>

      <div className="flex flex-col gap-10">

        <button
          className="btn plus"
          onClick={IncrementHandler}
          title="increment"
        >
          +
        </button>
        <button className="btn" onClick={ReadContractValue} title="read value">
          get value
        </button>
      </div>
      </>
      )
    }