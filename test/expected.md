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
