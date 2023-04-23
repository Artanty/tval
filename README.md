# tval

## Installation
See examples for more details:
<a href="https://github.com/Artanty/tval/tree/master/dist/examples" target="_blank">Examples</a>


#### npm

```shell
npm i tval -D
```

#### Include with &lt;script&gt;
```html
<script defer src="tval.js"></script>
```

##### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/queryzz/dist/queryzz.js"></script>
```

## How to use

simple type validation for api request and response

- 0 - null
- n - number
- s - string
- b - boolean
- a - any

### Conditional types:
[n, 0] - number or null

### Example usage:
```JS
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
const tvalResult = tvalidate(obj, check)
// =>
// [
//     {
//         "key": "id",
//         "value": 947,
//         "validator": 2,
//         "result": true
//     },
//     {
//         "key": "transport[0].name",
//         "value": "volvo",
//         "validator": 1,
//         "result": true
//     },
//     {
//         "key": "transport[0].wheels",
//         "value": 4,
//         "validator": [
//             1,
//             2
//         ],
//         "result": true
//     },
//     {
//         "key": "transport[1].name",
//         "value": "monobike",
//         "validator": 1,
//         "result": true
//     },
//     {
//         "key": "transport[1].wheels",
//         "value": 1,
//         "validator": [
//             1,
//             2
//         ],
//         "result": true
//     },
//     {
//         "key": "transport[2].name",
//         "value": "bicycle",
//         "validator": 1,
//         "result": true
//     },
//     {
//         "key": "transport[2].wheels",
//         "value": 2,
//         "validator": [
//             1,
//             2
//         ],
//         "result": true
//     },
//     {
//         "key": "today",
//         "value": "2024-10-03",
//         "validator": [
//             3,
//             4
//         ],
//         "result": true
//     }
// ]
```
## Methods

### tablize

Wrap result in table

```JS
tablize('tvalResultContainer', tvalResult)
```

#### Result =>: 
![tval result](https://github.com/Artanty/tval/blob/master/src/examples/result.png "")

### tvalLog

Return result in console

```JS
tvalLog(tvalResult)
```

#### Result =>: 
![tval result](https://github.com/Artanty/tval/blob/master/src/examples/result_console.png "")


<a href="https://github.com/Artanty/tval/blob/master/src/lib/tval.ts" target="_blank">Source code</a>
* * *

&copy; Artyom Antoshkin
