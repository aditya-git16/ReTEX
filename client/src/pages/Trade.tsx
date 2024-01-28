import { useState } from "react";
import { contractAddress } from "../utils/constants";
import Ret from "../utils/Counter.sol/ReTEX.json";
const ethers = require("ethers");

export default function Trade() {
    const [name, setName] = useState("");
    const [units, setUnits] = useState("");
  
    const handleTrade = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, Ret.abi, signer);
            await contract.setTrade(name, units);
        } catch (error) {
            console.error('Error trading:', error);
            // Optionally, you can add logic to handle errors or display an error message
        }
    };
  
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-4">Trade Component</h1>
            <div className="box">
                <div className="mb-4">
                    <label htmlFor="name" className="text-xl font-semibold mb-2 mr-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="units" className="text-xl font-semibold mb-2 mr-2">Units</label>
                    <input
                        type="number"
                        id="units"
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    />
                </div>
                <button
                    className="bg-blue-500 text-white rounded px-4 py-1"
                    onClick={handleTrade}
                >
                    Submit Trade
                </button>
            </div>
        </div>
    );
}
