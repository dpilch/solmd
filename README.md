# solmd

Generate lightweight markdown documentation for Solidity contracts.

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
// natspec example
/**
@title GavCoin
@author Gavin Wood
*/
contract GavCoin {
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
}
```

The above example will produce the following result as raw markdown.

```
* [GavCoin](#gavcoin)
  * [send](#function-send)

# GavCoin

Gavin Wood

## function send

`d0679d34`

**Send `(valueInmGAV / 1000).fixed(0,3)` GAV from the account of `message.caller.address()`, to an account accessible only by `to.address()**

> This should be the documentation of the function for the developer docs

Inputs

| | | |
|-|-|-|
| *address* | to | The address of the recipient of the GavCoin |
| *uint256* | valueInmGAV | The GavCoin value to send |

---
```

The same output now parsed:

* [GavCoin](#gavcoin)
  * [send](#function-send)

# GavCoin

Gavin Wood

## function send

`d0679d34`

**Send `(valueInmGAV / 1000).fixed(0,3)` GAV from the account of `message.caller.address()`, to an account accessible only by `to.address()**

> This should be the documentation of the function for the developer docs

Inputs

| | | |
|-|-|-|
| *address* | to | The address of the recipient of the GavCoin |
| *uint256* | valueInmGAV | The GavCoin value to send |

---

# License

MIT
