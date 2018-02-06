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
```

Return params may either be a single line or formatted as an object as shown above. In functions with multiple returns, params must be formatted as an object.

The above example will produce the following result as raw markdown.

```
* [BugBunny](#bugbunny)
  * [carrotHash](#function-carrothash)
  * [eat](#function-eat)
  * [doesEat](#function-doeseat)
  * [Consumption](#event-consumption)

# BugBunny

A simulator for Bug Bunny, the most famous Rabbit

Warned Bros

## *function* carrotHash

BugBunny.carrotHash() `view` `21ba2aed`

## *function* eat

BugBunny.eat(_food) `nonpayable` `728d9b74`

**Bug will eat `_food`**

> Magic funk machine wow.

Inputs

| type     | name  | description               |
| -------- | ----- | ------------------------- |
| *string* | _food | The name of a food to eat |

Outputs

| type      | name  | description                              |
| --------- | ----- | ---------------------------------------- |
| *bool*    | eaten | true if Bug will eat it, false otherwise |
| *bytes32* | hash  | hash of the food to eat                  |

## *function* doesEat

BugBunny.doesEat(_food) `view` `b6520a32`

**Determine if Bug will accept `_food` to eat**

> String comparison may be inefficient

Inputs

| type     | name  | description                              |
| -------- | ----- | ---------------------------------------- |
| *string* | _food | The name of a food to evaluate (English) |

Outputs

| type   | description                              |
| ------ | ---------------------------------------- |
| *bool* | true if Bug will eat it, false otherwise |

## *constructor*

BugBunny(carrot) `nonpayable`

Inputs

| type     | name   |
| -------- | ------ |
| *string* | carrot |

## *event* Consumption

BugBunny.Consumption(feeder, food) `be6b1648`

Arguments

| type      | name   | indexed     |
| --------- | ------ | ----------- |
| *address* | feeder | indexed     |
| *string*  | food   | not indexed |

---
```

The same output now parsed:

* [BugBunny](#bugbunny)
  * [carrotHash](#function-carrothash)
  * [eat](#function-eat)
  * [doesEat](#function-doeseat)
  * [Consumption](#event-consumption)

# BugBunny

A simulator for Bug Bunny, the most famous Rabbit

Warned Bros

## *function* carrotHash

BugBunny.carrotHash() `view` `21ba2aed`

## *function* eat

BugBunny.eat(_food) `nonpayable` `728d9b74`

**Bug will eat `_food`**

> Magic funk machine wow.

Inputs

| type     | name  | description               |
| -------- | ----- | ------------------------- |
| *string* | _food | The name of a food to eat |

Outputs

| type      | name  | description                              |
| --------- | ----- | ---------------------------------------- |
| *bool*    | eaten | true if Bug will eat it, false otherwise |
| *bytes32* | hash  | hash of the food to eat                  |

## *function* doesEat

BugBunny.doesEat(_food) `view` `b6520a32`

**Determine if Bug will accept `_food` to eat**

> String comparison may be inefficient

Inputs

| type     | name  | description                              |
| -------- | ----- | ---------------------------------------- |
| *string* | _food | The name of a food to evaluate (English) |

Outputs

| type   | description                              |
| ------ | ---------------------------------------- |
| *bool* | true if Bug will eat it, false otherwise |

## *constructor*

BugBunny(carrot) `nonpayable`

Inputs

| type     | name   |
| -------- | ------ |
| *string* | carrot |

## *event* Consumption

BugBunny.Consumption(feeder, food) `be6b1648`

Arguments

| type      | name   | indexed     |
| --------- | ------ | ----------- |
| *address* | feeder | indexed     |
| *string*  | food   | not indexed |

---

# License

MIT
