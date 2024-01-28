import { contractAddress } from "../utils/constants"
import { useState, useEffect } from "react"
import Ret from "../utils/Counter.sol/ReTEX.json"
const ethers = require("ethers")

export default function CounterApp() {
    const [producedUnits, setProducedUnits] = useState(0);
    const [consumedUnits, setConsumedUnits] = useState(0);
    const [name, setName] = useState('');
    const [updated, setUpdated] = useState(false);

      useEffect(() => {
        const fetchData = async () => {
          try {
            // Assuming you have a function to connect to the contract
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const Signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, Ret.abi, Signer);
    
            // Fetch produced units
            const [produced, consumed, _name] = await contract.getValues();
            
            setProducedUnits(ethers.BigNumber.from(produced).toNumber());
    
            // Fetch consumed units
            setConsumedUnits(ethers.BigNumber.from(consumed).toNumber());
            setName(_name);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        if (contractAddress && Ret.abi) {
          fetchData();
        }
      }, [contractAddress, Ret.abi]);

      const handleSetName = async () => {
        try {
          var inp = document.getElementById("input").value;
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, Ret.abi, signer);
          console.log(inp);
          await contract.setName(inp);
          setName(inp);
        } catch (error) {
          console.error('Error setting name:', error);
        }
      };

      const handleUpdateValues = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, Ret.abi, signer);
            await contract.setValues(producedUnits, consumedUnits);
            setUpdated(!updated);
        } catch (error) {
            console.error('Error updating values:', error);
        }
    };

      return (
        <>
      <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="box">
      <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Produced Units</h2>
            <p>{producedUnits}</p>
            <button
                className="submit-btn"
                onClick={() => setProducedUnits(producedUnits + 1)}
            >
                Increment
            </button>
        </div>
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Consumed Units</h2>
            <p>{consumedUnits}</p>
            <button
                className="submit-btn"
                onClick={() => setConsumedUnits(consumedUnits + 1)}
            >
                Increment
            </button>
        </div>
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Name</h2>
            {name ? (
              <p>{name}</p>
            ) : (
              <>
                <p>Please add your name:</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 mr-2"
                  id="input"
                />
                <button
                className="submit-btn"
                onClick={handleSetName}
                >
                Set Name
                </button>
              </>
            )}
          </div>
          <button
              className="submit-btn"
              onClick={handleUpdateValues}
          >
              Update Values
          </button>
      </div>
    </div>
      </>
      )
    }