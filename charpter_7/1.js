//  集合

class Set {
  constructor() {
    this.items = {}
  }

  // has(element) {
  //   return element in this.items
  // }
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }

  clear() {
    this.items = {}
  }

  size() {
    return Object.keys(this.items).length
  }

  sizeLegacy() {
    let count = 0
    for (const key in this.items) {
      if (Object.prototype.hasOwnProperty.call(this.items, key)) {
        count++
      }
    }
    return count
  }

  values() {
    return Object.values(this.items)
  }

  valueLegacy() {
    const values = []
    for (const key in this.items) {
      if (Object.prototype.hasOwnProperty.call(this.items, key)) {
        values.push(this.items[key])
      }
    }
    return values
  }

  union(otherSet) {
    const unionSet = new Set()
    this.values().forEach(value => unionSet.add(value))
    otherSet.values().forEach(value => unionSet.add(value))
    return unionSet
  }

  intersection(otherSet) {
    // const intersectionSet = new Set()
    // const values = this.values()
    // for (let i = 0; i < values.length; i++) {
    //   if (otherSet.has(values[i])) {
    //     intersectionSet.add(values[i])
    //   }
    // }
    // return intersectionSet

    // 改进循环
    const intersectionSet = new Set()
    const values = this.values()
    let biggerSet = values
    let smallerSet = otherSet.values()
    if (smallerSet.length - biggerSet.length > 0) {
      biggerSet = otherSet.values()
      smallerSet = values
    }
    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value)
      }
    })
    return intersectionSet
  }

  difference(otherSet) {
    const differenceSet = new Set()
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value)
      }
    })
    return differenceSet
  }

  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false
    }

    // let isSubset = true
    // this.values().every(value => {
    //   if (!otherSet.has(value)) {
    //     isSubset = false
    //     return false
    //   }
    //   return true
    // })
    // return isSubset
    return this.values().every(value => otherSet.has(value))
  }
}

// const set = new Set()
// set.add(1)
// console.log(set.values())
// console.log(set.has(1))
// console.log(set.size())

// set.add(2)
// console.log(set.values()) // 输出[1, 2]
// console.log(set.has(2)) // 输出 true
// console.log(set.size()) // 输出 2

// set.delete(1)
// console.log(set.values()) // 输出[2]
// set.delete(2)
// console.log(set.values()) // 输出[2]

// const setA = new Set()
// setA.add(1)
// setA.add(2)
// setA.add(3)
// const setB = new Set()
// setB.add(3)
// setB.add(4)
// setB.add(5)
// setB.add(6)
// const unionAB = setA.union(setB)
// console.log(unionAB)
// console.log(unionAB.values())

const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
setA.add(5)
const setB = new Set()
setB.add(1)
setB.add(2)
setB.add(3)
setB.add(4)
setB.add(5)
const intersectionAB = setA.intersection(setB)
console.log(intersectionAB.values())
const differenceAB = setA.difference(setB)
console.log(differenceAB.values())
console.log(setA.isSubsetOf(setB))
