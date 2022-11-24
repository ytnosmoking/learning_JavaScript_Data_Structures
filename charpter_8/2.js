// 散列表

const { LinkedList } = require('../charpter_6/1');

// HashTable
const defaultToString = item => {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
};

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `{#${this.key}:${this.value}}`;
  }
}
class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  loseloseHashCode(key) {
    // if (typeof key === 'number') {
    //   return key
    // }
    // const tableKey = this.toStrFn(key)
    // let hash = 0
    // for (let i = 0; i < tableKey.length; i++) {
    //   hash += tableKey.charCodeAt(i)
    // }

    // return hash % 37
    return this.djb2HashCode(key);
  }

  // another losehashCode
  djb2HashCode(key) {
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = hash * 33 + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  remove(key) {
    const hash = this.hashCode(key); // {1}
    const valuePair = this.table[hash]; // {2}
    if (valuePair != null) {
      delete this.table[hash]; // {3}
      return true;
    }
    return false;
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => 
   ${this.table[keys[i]].toString()}}`;
    }
    return objString;
  }
}

// const hash = new HashTable()

// hash.put('Gandalf', 'gandalf@email.com')
// hash.put('John', 'johnsnow@email.com')
// hash.put('Tyrion', 'tyrion@email.com')
// console.log(hash.hashCode('Gandalf') + ' - Gandalf')
// console.log(hash.hashCode('John') + ' - John')
// console.log(hash.hashCode('Tyrion') + ' - Tyrion')

// console.log(hash.get('Gandalf'))
// console.log(hash.get('Loiane'))
// hash.remove('Gandalf')
// console.log(hash.get('Gandalf'))

// hash.put('Ygritte', 'ygritte@email.com')
// hash.put('Jonathan', 'jonathan@email.com')
// hash.put('Jamie', 'jamie@email.com')
// hash.put('Jack', 'jack@email.com')
// hash.put('Jasmine', 'jasmine@email.com')
// hash.put('Jake', 'jake@email.com')
// hash.put('Nathan', 'nathan@email.com')
// hash.put('Athelstan', 'athelstan@email.com')
// hash.put('Sue', 'sue@email.com')
// hash.put('Aethelwulf', 'aethelwulf@email.com')
// hash.put('Sargeras', 'sargeras@email.com')

// console.log(hash.hashCode('Ygritte'), 'Ygritte')
// console.log(hash.hashCode('Jonathan'), 'Jonathan')
// console.log(hash.hashCode('Jamie'), 'Jamie')
// console.log(hash.hashCode('Jack'), 'Jack')
// console.log(hash.hashCode('Jasmine'), 'Jasmine')
// console.log(hash.hashCode('Jake'), 'Jake')
// console.log(hash.hashCode('Nathan'), 'Nathan')
// console.log(hash.hashCode('Athelstan'), 'Athelstan')
// console.log(hash.hashCode('Sue'), 'Sue')
// console.log(hash.hashCode('Aethelwulf'), 'Aethelwulf')
// console.log(hash.hashCode('Sargeras'), 'Sargeras')

// console.log(hash.toString())

class HashTableSeparateChaining extends HashTable {
  constructor(toStrFn = defaultToString) {
    super(toStrFn);
    this.toStrFn = toStrFn;
    this.table = {};
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
}

// const hashSeparate = new HashTableSeparateChaining()

// hashSeparate.put('Ygritte', 'ygritte@email.com')
// hashSeparate.put('Jonathan', 'jonathan@email.com')
// hashSeparate.put('Jamie', 'jamie@email.com')
// hashSeparate.put('Jack', 'jack@email.com')
// hashSeparate.put('Jasmine', 'jasmine@email.com')
// hashSeparate.put('Jake', 'jake@email.com')
// hashSeparate.put('Nathan', 'nathan@email.com')
// hashSeparate.put('Athelstan', 'athelstan@email.com')
// hashSeparate.put('Sue', 'sue@email.com')
// hashSeparate.put('Aethelwulf', 'aethelwulf@email.com')
// hashSeparate.put('Sargeras', 'sargeras@email.com')

// console.log(hashSeparate.hashCode('Ygritte'), 'Ygritte')
// console.log(hashSeparate.hashCode('Jonathan'), 'Jonathan')
// console.log(hashSeparate.hashCode('Jamie'), 'Jamie')
// console.log(hashSeparate.hashCode('Jack'), 'Jack')
// console.log(hashSeparate.hashCode('Jasmine'), 'Jasmine')
// console.log(hashSeparate.hashCode('Jake'), 'Jake')
// console.log(hashSeparate.hashCode('Nathan'), 'Nathan')
// console.log(hashSeparate.hashCode('Athelstan'), 'Athelstan')
// console.log(hashSeparate.hashCode('Sue'), 'Sue')
// console.log(hashSeparate.hashCode('Aethelwulf'), 'Aethelwulf')
// console.log(hashSeparate.hashCode('Sargeras'), 'Sargeras')

// console.log(hashSeparate.table[5])

// console.log(hashSeparate.get('Jonathan'))
// console.log(hashSeparate.get('Jamie'))
// console.log(hashSeparate.get('Sue'))
// console.log(hashSeparate.get('Aethelwulf'))

// hashSeparate.remove('Sue')
// console.log(hashSeparate.table[5])
// console.log(hashSeparate.toString())

class HashTableLinearProbingLazy extends HashTable {
  constructor(toStrFn = defaultToString) {
    super(toStrFn);
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (this.table[index] !== null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] !== null && this.table[index].key === key) {
        return this.table[index].value;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position); // {2}
        return true;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key === key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }

  // verifyRemoveSideEffect(key, removedPosition) {
  //   const hash = this.hashCode(key)
  //   let index = removedPosition + 1
  //   while (this.table[index] !== null) {
  //     const posHash = this.hashCode(this.table[index].key)
  //     if (posHash <= hash || posHash <= removedPosition) {
  //       this.table[removedPosition] = this.table[index]
  //       delete this.table[index]
  //       removedPosition = index
  //     }
  //     index++
  //   }
  // }

  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key); // {1}
    let index = removedPosition + 1; // {2}
    console.log(key, hash, removedPosition, index);
    while (this.table[index] != null) {
      // {3}
      const posHash = this.hashCode(this.table[index].key); // {4}
      if (posHash <= hash || posHash <= removedPosition) {
        // {5}
        this.table[removedPosition] = this.table[index]; // {6}
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }
}

const hashTableLazy = new HashTableLinearProbingLazy();

hashTableLazy.put('Ygritte', 'ygritte@email.com');
hashTableLazy.put('Jonathan', 'jonathan@email.com');
hashTableLazy.put('Jamie', 'jamie@email.com');
hashTableLazy.put('Jack', 'jack@email.com');
hashTableLazy.put('Jasmine', 'jasmine@email.com');
hashTableLazy.put('Jake', 'jake@email.com');
hashTableLazy.put('Nathan', 'nathan@email.com');
hashTableLazy.put('Athelstan', 'athelstan@email.com');
hashTableLazy.put('Sue', 'sue@email.com');
hashTableLazy.put('Aethelwulf', 'aethelwulf@email.com');
hashTableLazy.put('Sargeras', 'sargeras@email.com');
console.log(hashTableLazy);
hashTableLazy.remove('Jonathan');
console.log(hashTableLazy);

// console.log(hashTableLazy.get('Ygritte'), 'Ygritte')
// console.log(hashTableLazy.get('Jonathan'), 'Jonathan')
// console.log(hashTableLazy.get('Jamie'), 'Jamie')
// console.log(hashTableLazy.get('Jack'), 'Jack')
// console.log(hashTableLazy.get('Jasmine'), 'Jasmine')
// console.log(hashTableLazy.get('Jake'), 'Jake')
// console.log(hashTableLazy.get('Nathan'), 'Nathan')
// console.log(hashTableLazy.get('Athelstan'), 'Athelstan')
// console.log(hashTableLazy.get('Sue'), 'Sue')
// console.log(hashTableLazy.get('Aethelwulf'), 'Aethelwulf')
// console.log(hashTableLazy.get('Sargeras'), 'Sargeras')

// console.log(hashTableLazy.hashCode('Ygritte'), 'Ygritte')
// console.log(hashTableLazy.hashCode('Jonathan'), 'Jonathan')
// console.log(hashTableLazy.hashCode('Jamie'), 'Jamie')
// console.log(hashTableLazy.hashCode('Jack'), 'Jack')
// console.log(hashTableLazy.hashCode('Jasmine'), 'Jasmine')
// console.log(hashTableLazy.hashCode('Jake'), 'Jake')
// console.log(hashTableLazy.hashCode('Nathan'), 'Nathan')
// console.log(hashTableLazy.hashCode('Athelstan'), 'Athelstan')
// console.log(hashTableLazy.hashCode('Sue'), 'Sue')
// console.log(hashTableLazy.hashCode('Aethelwulf'), 'Aethelwulf')
// console.log(hashTableLazy.hashCode('Sargeras'), 'Sargeras')
