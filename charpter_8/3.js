// map

// const map = new Map()

// map.set('Gandalf', 'gandalf@email.com')
// map.set('John', 'johnsnow@email.com')
// map.set('Tyrion', 'tyrion@email.com')

// console.log(map.has('Gandalf'))

// console.log(map.size)
// console.log(map.keys())
// console.log(map.values())
// console.log(map.get('Tyrion'))

// WeakMap WeakSet
// Map 和 Set 与其弱化版本之间仅有的区别是：
//  WeakSet 或 WeakMap 类没有 entries、keys 和 values 等方法；
//  只能用对象作为键

const map = new WeakMap()
const ob1 = { name: 'Gandalf' } // {1}
const ob2 = { name: 'John' }
const ob3 = { name: 'Tyrion' }
map.set(ob1, 'gandalf@email.com') // {2}
map.set(ob2, 'johnsnow@email.com')
map.set(ob3, 'tyrion@email.com')
console.log(map.has(ob1)) // true {3}
console.log(map.get(ob3)) // tyrion@email.com {4}
map.delete(ob2) // {5}
console.log(map.has(ob2))
console.log(map.get(ob2))
