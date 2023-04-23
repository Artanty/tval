const {
  tvalidate,
  tvalLog,
  tablize,
  n,
  s,
  b,
  a
} = tval;
const obj = {
  id: 947,
  transport: [{
    name: 'volvo',
    wheels: 4
  }, {
    name: 'monobike',
    wheels: 1
  }, {
    name: 'bicycle',
    wheels: 2
  }],
  today: '2024-10-03'
};
const check = {
  id: n,
  transport: [{
    name: s,
    wheels: [s, n]
  }],
  today: [b, a]
};
// const check = {
//   id: 0,
//   transport: [
//     { name: 0, wheels: 0}
//   ],
//   today: 0
// }
const tvalResult = tvalidate(obj, check);
tvalLog(tvalResult);
tablize('tvalResultContainer', tvalResult);