import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress } from '../utils/constants';
import Ret from "../utils/Counter.sol/ReTEX.json"

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] : any = useState(null);

  const handleSearch = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(); // Replace with your provider
      const contract = new ethers.Contract(contractAddress, Ret.abi, provider);

      // Assuming getValueByName returns an array [produced, consumed, name]
      const data = await contract.getValueByName(searchValue);
      console.log(data);

      // Data structure: [produced, consumed, name]
      setUserData({
        produced: ethers.BigNumber.from(data[0]).toNumber(),
        consumed: ethers.BigNumber.from(data[1]).toNumber(),
        name: data[2]
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 h-screen">
      <h1 className="text-3xl font-semibold mb-4">Search</h1>
      <div className="box">
        <input
          type="text"
          className="border border-gray-300 px-3 py-2 w-full mb-4 rounded-md"
          placeholder="Enter User Name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
        {userData && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Search Result:</h2>
            <div className="grid grid-cols-2 gap-2">
              <div>Produced:</div>
              <div>{userData.produced}</div>
              <div>Consumed:</div>
              <div>{userData.consumed}</div>
              <div>Name:</div>
              <div>{userData.name}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
