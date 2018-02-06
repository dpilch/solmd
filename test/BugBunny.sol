pragma solidity ^0.4.19;

/// @title A simulator for Bug Bunny, the most famous Rabbit
/// @author Warned Bros
contract BugBunny {

    // tags on storage vars currently unsupported by devdocs
    bytes32 public carrotHash;

    // tags on events currently unsupported by devdocs
    event Consumption(address indexed feeder, string food);

    // tags on constructors currently unsupported by devdocs
    function BugBunny(string carrot) public {
        carrotHash = keccak256(carrot);
    }

    /// @author Bob Clampett
    /// @notice Determine if Bug will accept `_food` to eat
    /// @dev String comparison may be inefficient
    /// @param _food The name of a food to evaluate (English)
    /// @return true if Bug will eat it, false otherwise
    function doesEat(string _food) public view returns (bool) {
        return keccak256(_food) == carrotHash;
    }

    /// @author Funk Master
    /// @notice Bug will eat `_food`
    /// @dev Magic funk machine wow.
    /// @param _food The name of a food to eat
    /// @return {
    ///    "eaten": "true if Bug will eat it, false otherwise",
    ///    "hash": "hash of the food to eat"
    /// }
    function eat(string _food) external returns (bool eaten, bytes32 hash) {
        eaten = doesEat(_food);
        hash = keccak256(_food);
        if(eaten) {
            Consumption(msg.sender, _food);
        }
    }
}
