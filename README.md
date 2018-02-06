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

```sol
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

    function GavCoin() public {
        owner = msg.sender;
    }

    /**
    @notice Send `(valueInmGAV / 1000).fixed(0,3)` GAV from the account of
    `message.caller.address()`, to an account accessible only by `to.address()
    @dev This should be the documentation of the function for the developer docs
    @param to The address of the recipient of the GavCoin
    @param valueInmGAV The GavCoin value to send
    */
    function send(address to, uint256 valueInmGAV) public {
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
    function setOwner(address _owner) public returns (address previousOwner) {
        previousOwner = owner;
        owner = _owner;
        return previousOwner;
    }

    /**
    @notice create new gav coins
    @dev use this funciton to create new gavcoins from Ether
    */
    function mint() public payable {
        require(msg.value > 0);
        balances[msg.sender] += (msg.value * exchangeRate);
    }
}
```

Return params may either be a single line or formatted as an object as shown above. In functions with multiple returns, params must be formatted as an object.

The above example will produce the following result as raw markdown.

```
* [GavCoin](#gavcoin)
  * [mint](#function-mint)
  * [setOwner](#function-setowner)
  * [balances](#function-balances)
  * [send](#function-send)

# GavCoin

Gavin Wood

## *function* mint

GavCoin.mint() `payable` `1249c58b`

**create new gav coins**

> use this funciton to create new gavcoins from Ether

## *function* setOwner

GavCoin.setOwner(_owner) `nonpayable` `13af4035`

**change owner**

> dev

Inputs

| *address* | _owner | this is the owner |

Outputs

| *address* | previousOwner | the previous owner |

## *function* balances

GavCoin.balances() `view` `27e235e3`

Inputs

| *address* |

## *function* send

GavCoin.send(to, valueInmGAV) `nonpayable` `d0679d34`

**Send `(valueInmGAV / 1000).fixed(0,3)` GAV from the account of `message.caller.address()`, to an account accessible only by `to.address()`**

> This should be the documentation of the function for the developer docs

Inputs

| *address* | to | The address of the recipient of the GavCoin |
| *uint256* | valueInmGAV | The GavCoin value to send |

---
```

The same output now parsed:

* [GavCoin](#gavcoin)
  * [mint](#function-mint)
  * [setOwner](#function-setowner)
  * [balances](#function-balances)
  * [send](#function-send)

# GavCoin

Gavin Wood

## *function* mint

GavCoin.mint() `payable` `1249c58b`

**create new gav coins**

> use this funciton to create new gavcoins from Ether

## *function* setOwner

GavCoin.setOwner(_owner) `nonpayable` `13af4035`

**change owner**

> dev

Inputs

| *address* | _owner | this is the owner |

Outputs

| *address* | previousOwner | the previous owner |

## *function* balances

GavCoin.balances() `view` `27e235e3`

Inputs

| *address* |

## *function* send

GavCoin.send(to, valueInmGAV) `nonpayable` `d0679d34`

**Send `(valueInmGAV / 1000).fixed(0,3)` GAV from the account of `message.caller.address()`, to an account accessible only by `to.address()`**

> This should be the documentation of the function for the developer docs

Inputs

| *address* | to | The address of the recipient of the GavCoin |
| *uint256* | valueInmGAV | The GavCoin value to send |

---

# License

MIT
