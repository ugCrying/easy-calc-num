# Easy Calculate Number

A JavaScript library for arbitrary-precision decimal arithmetic.

## Install

```
npm i easy-calc-num
```

or

```
yarn add easy-calc-num
```

## Use

```
import { Ecn } from 'easy-calc-num'

const ecn = new Ecn(123456.7e-3) // "123.4567"

ecn.mul(new Ecn(50,3)) // "6.172835"

ecn.div(new Ecn(50,3)) // "2469.1"

ecn.plus(new Ecn(50,3)) // "123.5067"

ecn.minus(new Ecn(50,3)) // "123.4067"

```

## Test

```
npm test
```

or

```
node test
```


## Build

```
rollup -c
```