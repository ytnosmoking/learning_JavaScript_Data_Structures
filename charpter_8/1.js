// 字典

const defaultToString = item => {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `{#${this.key}:${this.value}}`
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null
  }

  set(key, value) {
    if (key !== null && value !== null) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }

  get(key) {
    // const valuePair = this.table[this.toStrFn(key)]
    // return valuePair === null ? undefined : valuePair.value
    // 们会获取两次 key 的字符串以及访问两次 table 对象：第一次
    // 是在 hasKey 方法中，第二次是在 if 语句内。这是个小细节，不过第一种方式的消耗更少
    if (this.hasKey(key)) {
      return this.table[this.toStrFn(key)]
    }
    return undefined
  }

  keyValues() {
    // return Object.values(this.table)

    const valuePair = []
    for (const k in this.table) {
      if (this.hasKey(k)) {
        valuePair.push(this.table[k])
      }
    }
    return valuePair
  }

  keys() {
    return this.keyValues().map(valuePair => valuePair.key)
  }

  forEach(callbackFn) {
    const valuePairs = this.keyValues()
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
      if (result === false) {
        break
      }
    }
  }

  size() {
    return Object.keys(this.table).length
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.table = 0
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    const valuePairs = this.keyValues()
    let objString = `${valuePairs[0].toString()}` // {1}
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}` // {2}
    }
    return objString // {3}
  }
}

const dictionary = new Dictionary()
dictionary.set('Gandalf', 'gandalf@email.com')
dictionary.set('John', 'johnsnow@email.com')
dictionary.set('Tyrion', 'tyrion@email.com')

console.log(dictionary.hasKey('Gandalf'))

console.log(dictionary.size())

console.log(dictionary.keys())
console.log(dictionary.values())
console.log(dictionary.get('Tyrion'))

dictionary.remove('John')

console.log(dictionary.keys())
console.log(dictionary.values())
console.log(dictionary.keyValues())

dictionary.forEach((k, v) => {
  console.log('forEach: ', `key: ${k}, value: ${v}`)
})
