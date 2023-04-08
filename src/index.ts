import { Table } from 'console-table-printer'
import { contractGetApiResponseItemCheck } from './examples/largeCheck'
import { contractGetResponce } from './examples/largeObject'
import { isString, numberToType } from './helpers'
import './index.html'
import { TvalObject } from './types'
import tval from './validator'
import { n, s, b } from './values'
import { tablize, tvalLog } from './wrapper'


const obj = {
  id: 947,
  transport: [
    { name: 'volvo', wheels: 4 },
    { name: 'monobike', wheels: 1 },
    { name: 'bicycle', wheels: 2 }
  ],
  today: "2024-10-03"
}
const check = {
  id: n,
  transport: [
    { name: s, wheels: [s,n]}
  ],
  today: [b]
}
const tvalResult = tval(obj, check)

tvalLog(tvalResult)
tablize('tvalResultContainer', tvalResult)