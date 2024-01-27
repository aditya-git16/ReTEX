//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

contract ReTEX {

    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    struct UserData {
        uint256 produced;
        uint256 consumed;
        string name;
    }

    mapping(string => address) public nameToAddress;

    mapping(address => UserData) public UserDatamap;

    function setValues(uint256 _value1, uint256 _value2 ) external {
        // Use the sender's address as the key in the mapping
        address sender = msg.sender;
        
        // Update the struct associated with the sender's address
        UserDatamap[sender].consumed = _value1;
        UserDatamap[sender].produced = _value2;
    }

    function getValues() external view returns (uint256, uint256, string memory) {
        // Retrieve the struct associated with the sender's address
        UserData storage userData = UserDatamap[msg.sender];
        
        return (userData.produced , userData.consumed, userData.name);
    }

    function setName(string memory _name) external {
        UserDatamap[msg.sender].name = _name;
        nameToAddress[_name] = msg.sender;
    }

    function getValueByName(string memory _name) external view returns (uint256, uint256, string memory) {
        address userAddress = nameToAddress[_name];
        UserData storage userData = UserDatamap[userAddress];
        return (userData.produced , userData.consumed, userData.name);
    }
}


