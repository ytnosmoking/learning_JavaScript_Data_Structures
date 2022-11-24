// 数组

// unshift
const a = [1, 2, 3, 4, 5, 6];
// eslint-disable-next-line no-extend-native
Array.prototype.insertFirstPlace = function (value) {
  for (let index = this.length; index >= 0; index--) {
    this[index] = this[index - 1];
  }
  this[0] = value;
};

a.insertFirstPlace(10);
console.log(a);
// unshift push element to first
// shift remove first element
// push  push element
// pop   remove last element

const matrix = [
  ['1-1', '1-2', '1-3', '1-4', '1-5'],
  ['2-1', '2-2', '2-3', '2-4', '2-5'],
  ['3-1', '3-2', '3-3', '3-4', '3-5'],
  ['4-1', '4-2', '4-3', '4-4', '4-5'],
  ['5-1', '5-2', '5-3', '5-4', '5-5']
];
for (let x = 0; x < matrix.length; x++) {
  const element = matrix[x];
  for (let y = 0; y < element.length; y++) {
    const k = element[y];
    if ((x === 1) & (y === 1)) console.log(k);
  }
}
// concat
const c = [1];
console.log('concat', c.concat(1), c);
console.log('concat', c.concat([2]), c);
console.log('concat', c.concat(...[[1], [2]]), c);
console.log('concat', c.concat(...[[1], [2, [3]]]), c);

// every  every ture return true
const d = [2, 3, 4, 5, 6];
console.log(d.every(item => item > 1));
console.log(d.every(item => item > 2));

// filter
const e = [1, 2, 3, 4];
console.log(
  e.filter(item => item > 2),
  e
);

// forEach

// join
const f = [1, 2, 3, 4, 5];
console.log(f.join('-'), f);

const g = [2, 3, 2, 5, 2];
console.log(g.indexOf(2)); // 0
console.log(g.lastIndexOf(2)); // 4

// map

// reverse
const h = [1, 2, 3, 4, 5];
console.log(h.reverse(), h);

// slice
const i = [1, 2, 3, 4, 5, 6];
console.log(i.slice(2), i.slice(2, 4), i);

// valueOf toString
const j = [1, 2, 3, 4, 5];
console.log(j.valueOf(), j.toString(), j);

// copyWithIn
// 用于操作当前数组自身，用来把某些个位置的元素复制并覆盖到其他位置上去。
// Array.prototype.copyWithin(target, start = 0, end = this.length)
// target：目的起始位置。
// start：复制源的起始位置，可以省略，可以是负数。
// end：复制源的结束位置，可以省略，可以是负数，实际结束位置是end-1。
const k = [2, 4, 6, 8, 10];
console.log(k);
console.log(k.copyWithin(1, 2, -2));

// entries
const l = [1, 2, 3];
console.log(l.entries());
const lk = l.keys();
const lv = l.values();
const le = l.entries();
console.log(lk.next(), lv.next(), le.next());
console.log(lk.next(), lv.next(), le.next());
console.log(lk.next(), lv.next(), le.next());
console.log(lk.next(), lv.next(), le.next());

// Array.from
const m = Array.from({ length: 10 }, () => Math.random().toFixed(2));
console.log(m);
