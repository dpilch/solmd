pragma solidity ^0.4.13;


// natspec example
/**
@title GavCoin
@author Gavin Wood
*/
contract GavCoin {
    mapping (address => uint256) public balances;
    address owner;
    uint exchangeRate;

    function GavCoin() {
        owner = msg.sender;
    }

    /**
    @notice Send `(valueInmGAV / 1000).fixed(0,3)` GAV from the account of
    `message.caller.address()`, to an account accessible only by `to.address()
    @dev This should be the documentation of the function for the developer docs
    @param to The address of the recipient of the GavCoin
    @param valueInmGAV The GavCoin value to send
    */
    function send(address to, uint256 valueInmGAV) {
        if (balances[msg.sender] >= valueInmGAV) {
            balances[to] += valueInmGAV;
            balances[msg.sender] -= valueInmGAV;
        }
    }

    /**
    @notice change owner
    @dev dev
    @param _owner this is the owner
    @return {
        "previousOwner": "the previous owner"
    }
    */
    function setOwner(address _owner) returns (address previousOwner) {
        previousOwner = owner;
        owner = _owner;
        return previousOwner;
    }

    /**
    @notice create new gav coins
    @dev use this funciton to create new gavcoins from Ether
    */
    function mint() payable {
        require(msg.value > 0);
        balances[msg.sender] += (msg.value * exchangeRate);
    }
}
