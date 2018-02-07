pragma solidity ^0.4.19;

/// @title A simulator for Bug Bunny, the most famous Rabbit
/// @author Warned Bros
contract BugBunny {

    // tags on storage vars currently unsupported by devdocs
    bytes32 public carrotHash;
    mapping (address => mapping (uint => bool)) public ballerz;

    // tags on events currently unsupported by devdocs
    event Consumption(address indexed feeder, string food);
    event Consumption(address indexed payer, uint amount);
    event AnonEvent() anonymous;

    // tags on constructors currently unsupported by devdocs
    function BugBunny(string carrot) public {
        carrotHash = keccak256(carrot);
    }

    /// @author Birb Lampkett
    /// @notice Determine if Bug will accept `_food` to eat
    /// @dev String comparison may be inefficient
    /// @param _food The name of a food to evaluate (English)
    /// @return true if Bug will eat it, false otherwise
    function doesEat(string _food) public view returns (bool) {
        return keccak256(_food) == carrotHash;
    }

    /// @author Funk Master
    /// @dev Magic funk machine wow.
    /// @param _food The name of a food to eat
    /// @return {
    ///    "eaten": "true if Bug will eat it, false otherwise",
    ///    "hash": "hash of the food to eat"
    /// }
    function eat(string _food) public returns (bool eaten, bytes32 hash) {
        eaten = doesEat(_food);
        hash = keccak256(_food);
        if(eaten) {
            Consumption(msg.sender, _food);
        }
    }

    /// @notice Bug will eat either `food1` or `food2`
    /// @dev Raw stuff.
    /// @param food1 The name of first food to try
    /// @param food2 The name of second food to try
    /// @return {
    ///    "eaten": "true if Bug ate, false otherwise",
    ///    "hash": "hash of the food eaten"
    /// }
    function eat(string food1, string food2) external returns (bool eaten, bytes32 hash) {
        if(doesEat(food1)) {
            (eaten, hash) = eat(food1);
        } else {
            (eaten, hash) = eat(food2);
        }
    }

    // tags on fallback functions currently not supported by devdocs
    function() external payable {
        Consumption(msg.sender, msg.value);
        ballerz[msg.sender][msg.value] = true;
    }
}

/// @title For use the space batle
/// @author Jorge Lucaz
contract StarWar {
    function() external {}
    function pew(uint) public pure returns(uint);
}
