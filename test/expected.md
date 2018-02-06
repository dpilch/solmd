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