//  原生set类

const set = new Set()

// set.add(1)
// set.add(2)
// console.log(set.values())
// console.log(...set.values())
// console.log(set.has(1))
// console.log(set.delete(2))
// console.log(...set.values())

// console.log(set.size)
// set.clear()
// console.log(set.size)
// console.log(...set.values())

const union = (setA, setB) => {
  // const unionAB = new Set()

  // // setA.forEach(value => unionAB.add(value))
  // // setB.forEach(value => unionAB.add(value))
  const unionAB = new Set([...setA, ...setB])
  return unionAB
}
const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 3, 4, 5])

const intersection = (setA, setB) => {
  // const intersectionSet = new Set()
  // const smallSet = setA.size > setB ? setB : setA
  // smallSet.forEach(value => {
  //   if (setB.has(value)) {
  //     intersectionSet.add(value)
  //   }
  // })

  // return intersectionSet
  return new Set([...setA].filter(value => setB.has(value)))
}

const difference = (setA, setB) => {
  // const differenceSet = new Set()
  // setA.forEach(value => {
  //   if (!setB.has(value)) {
  //     differenceSet.add(value)
  //   }
  // })
  // return differenceSet
  return new Set([...setA].filter(value => !setB.has(value)))
}

console.log('union', union(setA, setB))
console.log('intersection', intersection(setA, setB))
console.log('difference', difference(setA, setB))
console.log('difference', difference(setB, setA))
