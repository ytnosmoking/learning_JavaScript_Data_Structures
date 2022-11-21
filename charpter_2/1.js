class Person {
  constructor(name) {
    this._name = name
  }

  get name() {
    const c = `get --- 12313${1234}`
    console.log(c)
    return this._name
  }

  set name(value) {
    console.log('set')
    this._name = value
  }
}

const p = new Person('abc')
const a = p.name
p.name = 'cde'
