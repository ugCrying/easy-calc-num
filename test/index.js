import { Ecn } from '../index.js'

const ecn1 = new Ecn(11, 1)
const ecn2 = new Ecn(1.3)

const ecn3 = ecn1.mul(ecn2)
// console.log('t1', ecn3)

const ecn4 = ecn2.div(ecn1)
// console.log('t2', ecn4)

const ecn5 = ecn2.plus(ecn1)
console.log('t3', ecn5)

const ecn6 = ecn2.minus(ecn1)
// console.log('t3', ecn6)
