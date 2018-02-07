# solmd

Generate lightweight markdown documentation for Solidity contracts.

[![Build Status](https://travis-ci.org/dpilch/solmd.svg?branch=master)](https://travis-ci.org/dpilch/solmd)

## Installation

```
npm install -g solmd
```

Requires [solc](http://solidity.readthedocs.io/en/develop/installing-solidity.html) to installed in your path.

```
solmd <src> [--dest <target>]
```

Output will default to `sol.md`;

Uses [Ethereum Natural Specification Format](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format) to generate method details.

```
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

// /// @title For use the space batle
// /// @author Jorge Lucaz
// contract StarWar {
//     function() external {
//     }
// }
```

Return params may either be a single line or formatted as an object as shown above. In functions with multiple returns, params must be formatted as an object.

The above example will produce the following result as raw markdown.

```
* [BugBunny](#bugbunny)
  * [Events](#events)
  * [Accessors](#accessors)
  * [Functions](#functions)
    * [eat(*string* food1, *string* food2)](#eatstring-food1-string-food2)
    * [eat(*string* _food)](#eatstring-_food)
    * [doesEat(*string* _food)](#doeseatstring-_food)

# BugBunny

### A simulator for Bug Bunny, the most famous Rabbit

**Author**: Warned Bros

**Constructor**: BugBunny(*string* carrot)

This contract has a `payable` fallback function.

## Events

* Consumption(*address* `indexed` feeder, *string* food)
  `be6b16487b5d077520d7501d2566cbd948bb405c595b2095397662a05d7052fe`
* Consumption(*address* `indexed` payer, *uint256* amount)
  `4d03323821b5dfc96a698f2002d64ab816662937a4d5366e851acda40ceb319a`
* AnonEvent()
  `anonymous`

## Accessors

* *bytes32* carrotHash() `21ba2aed`
* *bool* ballerz(*address*, *uint256*) `ba91571b`

## Functions

### eat(*string* food1, *string* food2)

**State mutability**: `nonpayable`
**Signature hash**: `26fab75d`
**Notice**: Bug will eat either `food1` or `food2`

Raw stuff.

#### Inputs

| type     | name  | description                    |
| -------- | ----- | ------------------------------ |
| *string* | food1 | The name of first food to try  |
| *string* | food2 | The name of second food to try |

#### Outputs

| type      | name  | description                      |
| --------- | ----- | -------------------------------- |
| *bool*    | eaten | true if Bug ate, false otherwise |
| *bytes32* | hash  | hash of the food eaten           |

### eat(*string* _food)

**State mutability**: `nonpayable`
**Signature hash**: `728d9b74`
**Author**: Funk Master

Magic funk machine wow.

#### Inputs

| type     | name  | description               |
| -------- | ----- | ------------------------- |
| *string* | _food | The name of a food to eat |

#### Outputs

| type      | name  | description                              |
| --------- | ----- | ---------------------------------------- |
| *bool*    | eaten | true if Bug will eat it, false otherwise |
| *bytes32* | hash  | hash of the food to eat                  |

### doesEat(*string* _food)

**State mutability**: `view`
**Signature hash**: `b6520a32`
**Author**: Birb Lampkett
**Notice**: Determine if Bug will accept `_food` to eat

String comparison may be inefficient

#### Inputs

| type     | name  | description                              |
| -------- | ----- | ---------------------------------------- |
| *string* | _food | The name of a food to evaluate (English) |

#### Outputs

| type   | description                              |
| ------ | ---------------------------------------- |
| *bool* | true if Bug will eat it, false otherwise |
```

The same output now parsed:

* [BugBunny](#bugbunny)
  * [Events](#events)
  * [Accessors](#accessors)
  * [Functions](#functions)
    * [eat(*string* food1, *string* food2)](#eatstring-food1-string-food2)
    * [eat(*string* _food)](#eatstring-_food)
    * [doesEat(*string* _food)](#doeseatstring-_food)

# BugBunny

### A simulator for Bug Bunny, the most famous Rabbit

**Author**: Warned Bros

**Constructor**: BugBunny(*string* carrot)

This contract has a `payable` fallback function.

## Events

* Consumption(*address* `indexed` feeder, *string* food)
  `be6b16487b5d077520d7501d2566cbd948bb405c595b2095397662a05d7052fe`
* Consumption(*address* `indexed` payer, *uint256* amount)
  `4d03323821b5dfc96a698f2002d64ab816662937a4d5366e851acda40ceb319a`
* AnonEvent()
  `anonymous`

## Accessors

* *bytes32* carrotHash() `21ba2aed`
* *bool* ballerz(*address*, *uint256*) `ba91571b`

## Functions

### eat(*string* food1, *string* food2)

**State mutability**: `nonpayable`
**Signature hash**: `26fab75d`
**Notice**: Bug will eat either `food1` or `food2`

Raw stuff.

#### Inputs

| type     | name  | description                    |
| -------- | ----- | ------------------------------ |
| *string* | food1 | The name of first food to try  |
| *string* | food2 | The name of second food to try |

#### Outputs

| type      | name  | description                      |
| --------- | ----- | -------------------------------- |
| *bool*    | eaten | true if Bug ate, false otherwise |
| *bytes32* | hash  | hash of the food eaten           |

### eat(*string* _food)

**State mutability**: `nonpayable`
**Signature hash**: `728d9b74`
**Author**: Funk Master

Magic funk machine wow.

#### Inputs

| type     | name  | description               |
| -------- | ----- | ------------------------- |
| *string* | _food | The name of a food to eat |

#### Outputs

| type      | name  | description                              |
| --------- | ----- | ---------------------------------------- |
| *bool*    | eaten | true if Bug will eat it, false otherwise |
| *bytes32* | hash  | hash of the food to eat                  |

### doesEat(*string* _food)

**State mutability**: `view`
**Signature hash**: `b6520a32`
**Author**: Birb Lampkett
**Notice**: Determine if Bug will accept `_food` to eat

String comparison may be inefficient

#### Inputs

| type     | name  | description                              |
| -------- | ----- | ---------------------------------------- |
| *string* | _food | The name of a food to evaluate (English) |

#### Outputs

| type   | description                              |
| ------ | ---------------------------------------- |
| *bool* | true if Bug will eat it, false otherwise |

# License

MIT
