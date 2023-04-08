# tval

simple type validation for api request and response

0 - null
n - number
s - string
b - boolean
a - any

##Conditional types:
[n, 0] - number or null

##Example usage:

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

result: 
![tval result](https://github.com/Artanty/tval/blob/master/src/examples/result.png "")
