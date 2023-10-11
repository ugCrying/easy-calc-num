import { Ecn, numToStr } from '../index.js'

const ecn1 = new Ecn(3.12321e18, 18)
const ecn2 = new Ecn(6e18, 18)
const ecn3 = ecn1.mult(ecn2)
// const ecn3 = ecn1.mult(6)

console.log('t', ecn3)
