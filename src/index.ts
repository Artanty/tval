import { contractGetApiResponseItemCheck } from './examples/largeCheck'
import { contractGetResponce } from './examples/largeObject'
import { numberToType } from './helpers'
import './index.html'
import { Tval } from './validator'
import { n, s, b } from './values'

const tablize = (tvalResult: any[]) => {
  const tbody = document.getElementById('tbody') as HTMLTableElement
  tvalResult.forEach((el: any) => {
    const tr = document.createElement('tr'),
          td1 = document.createElement('td'),
          td2 = document.createElement('td'),
          td3 = document.createElement('td'),
          td4 = document.createElement('td')
    td1.innerHTML = numberToType(el.validator)
    td2.innerHTML = el.result
    td3.innerHTML = el.key
    td4.innerHTML = el.value
    tr.append(td1, td2, td3, td4)
    tbody.appendChild(tr)
  })
}

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
const tvalResult = new Tval(obj, check).result
tablize(tvalResult)
console.log(tvalResult)
