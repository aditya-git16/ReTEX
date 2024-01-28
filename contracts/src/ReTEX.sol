//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

contract ReTEX {

    address public immutable owner;
    // address[] public allUserAddresses; // New array to store all user addresses
    UserData[] public UserArray;
    
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
    mapping(address => address[]) public userFavorites;
    event TradeInitiated(address indexed user, address indexed selectedUser, uint256 tradeAmount);

    function setValues(uint256 _value1, uint256 _value2 ) external {
        // Use the sender's address as the key in the mapping
        address sender = msg.sender;
        
        // Update the struct associated with the sender's address
        UserDatamap[sender].produced = _value1;
        UserDatamap[sender].consumed = _value2;
        
    }

    function getValues() external view returns (uint256, uint256, string memory) {
        // Retrieve the struct associated with the sender's address
        UserData storage userData = UserDatamap[msg.sender];
        
        return (userData.produced , userData.consumed, userData.name);
        
    }

     function addUser(uint256 _produced, uint256 _consumed, string memory _name) external {
        UserData memory newUser = UserData(_produced, _consumed, _name);
        UserArray.push(newUser);
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

    function getUserDetails(uint256 index) external view returns (uint256, uint256, string memory) {
        require(index < UserArray.length, "Index out of bounds");

        UserData storage user = UserArray[index];
        return (user.produced, user.consumed, user.name);
    }

    function addToFavorites(address toUserAdd) external {
        userFavorites[msg.sender].push(toUserAdd);
    }

   function getFavorites() external view returns (address[] memory) {
        return userFavorites[msg.sender];
    }

    function setTrade(address selectedUser, uint256 tradeResource) external {
        require(tradeResource > 0, "Trade amount must be greater than zero");
        require(userResourceBalance[msg.sender] >= tradeResource, "Insufficient resources to trade");
        bool isFavorite = false;
        for (uint256 i = 0; i < userFavorites[msg.sender].length; i++) {
            if (userFavorites[msg.sender][i] == selectedUser) {
                isFavorite = true;
                break;
            }
        }
        require(isFavorite, "Selected user is not in favorites");

        
        userResourceBalance[msg.sender] -= tradeResource;
        userResourceBalance[selectedUser] += tradeResource;

        emit ResourcesTraded(msg.sender, selectedUser, tradeResource);
        emit TradeInitiated(msg.sender, selectedUser, tradeResource);
    }

}


