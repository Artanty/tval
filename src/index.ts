import './index.html'
import { preV } from './validator'

const obj = {
  zero: { id: '3', name: '8' },
  one: ['1', 2, 3, null],
  two: { id: 1000, name: 'Dracula'},
  three: {
    threeOne: 31
  },
  four: [{ id: 11, name: 'Artyom' }, { id: null }, { id: 'u' }, { id: 'u' }],
  five: [{ id: 16, name: 'Gosha'}, { id: 19, name: null }],
  six: null
}
const subCheck = {
  id: 2,
  name: 3
}
const subCheck2 = {
  id: 2,
  name: 1
}
const subCheck3 = {
  id: 1,
  name: 1
}
const check = {
  zero: [{ id: 1, name: 2 }, 3, subCheck2,subCheck3], 
  one: [[1,3]],
  two: [subCheck, subCheck2],
  three: {
    threeOne: [2,1]
  },
  four: [{ id: [1,2] }],
  five: [subCheck],
  six: [3,1,subCheck2]
}
let fullResult = {}

fullResult = preV(obj, check)
console.log(fullResult)


// const outputWrapper = document.getElementById('output') as HTMLElement
// outputWrapper.innerHTML = plus(4,4)