const GavCoin = `* [GavCoin](#gavcoin)
  * [mint](#function-mint)
  * [setOwner](#function-setowner)
  * [balances](#function-balances)
  * [send](#function-send)

# GavCoin

Gavin Wood

## *function* mint

GavCoin.mint() \`payable\` \`1249c58b\`

**create new gav coins**

> use this funciton to create new gavcoins from Ether

## *function* setOwner

GavCoin.setOwner(_owner) \`nonpayable\` \`13af4035\`

**change owner**

> dev

Inputs

| type      | name   | description       |
| --------- | ------ | ----------------- |
| *address* | _owner | this is the owner |

Outputs

| type      | name          | description        |
| --------- | ------------- | ------------------ |
| *address* | previousOwner | the previous owner |

## *function* balances

GavCoin.balances() \`view\` \`27e235e3\`

Inputs

| type      |
| --------- |
| *address* |

## *function* send

GavCoin.send(to, valueInmGAV) \`nonpayable\` \`d0679d34\`

**Send \`(valueInmGAV / 1000).fixed(0,3)\` GAV from the account of \`message.caller.address()\`, to an account accessible only by \`to.address()\`**

> This should be the documentation of the function for the developer docs

Inputs

| type      | name        | description                                 |
| --------- | ----------- | ------------------------------------------- |
| *address* | to          | The address of the recipient of the GavCoin |
| *uint256* | valueInmGAV | The GavCoin value to send                   |

---`;

module.exports = { GavCoin };
