const GavCoin = `
# GavCoin

Gavin Wood

## *function* balances

GavCoin.balances() \`27e235e3\`


Inputs

| | | |
|-|-|-|
| *address* |  | undefined |
Outputs

| | | |
|-|-|-|
| *uint256* |  | undefined |

## *function* send

GavCoin.send(to, valueInmGAV) \`d0679d34\`

**Send \`(valueInmGAV / 1000).fixed(0,3)\` GAV from the account of \`message.caller.address()\`, to an account accessible only by \`to.address()**

> This should be the documentation of the function for the developer docs

Inputs

| | | |
|-|-|-|
| *address* | to | The address of the recipient of the GavCoin |
| *uint256* | valueInmGAV | The GavCoin value to send |



---`;

module.exports = { GavCoin };
