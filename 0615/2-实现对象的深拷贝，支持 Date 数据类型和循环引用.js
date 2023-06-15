// 实现对象的深拷贝，支持 Date 数据类型和循环引用。
// 具体思路是 1. 使用递归的方式遍历对象的属性，
// 2. 以及使用 Map 对象记录已经拷贝过的对象，从而避免循环引用的问题。
// 3. 对Date类型单独判断

function deepClone (obj, map = new Map()) {
  // 如果不是对象类型或者是 null，则直接返回该值
  if (typeof obj !== 'object' || obj == null)
    return obj

  // 如果该对象已经被拷贝过，直接返回该对象被拷贝后的结果
  if (map.has(obj)) {
    return map.get(obj)
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  if (obj instanceof Number) {
    return new Number(obj)
  }
  if (obj instanceof String) {
    return new String(obj)
  }
  if (obj instanceof Boolean) {
    return new Boolean(obj)
  }

  if (obj instanceof Map) {
    const res = new Map()
    map.set(obj, res)
    obj.forEach((value, key) => {
      res.set(deepClone(key, map), deepClone(value, map))
    })
    return res
  }

  if (obj instanceof Set) {
    const res = new Set()
    map.set(obj, res)
    obj.forEach((value) => {
      res.add(deepClone(value, map))
    })
    return res
  }

  if (Array.isArray(obj)) {
    const res = []
    map.set(obj, res)
    obj.forEach(value => {
      res.push(deepClone(value, map))
    })
    return res
  }

  const res = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key], map)
    }
  }
  return res
}

const obj = {
  a: 1,
  b: {
    c: 2,
    d: [3, '4', { e: 5 }]
  },
  f: new Map([['g', { h: 6 }]]),
  i: new Set(['j', 8, [9, 10]]),
  k: new Date('2023-06-15'),
  l: (test) => { console.log(test) },
  m: Symbol('test'),
  n: new Number(3)
}

const cloneObj = deepClone(obj)
// const cloneObj = obj
console.log(cloneObj !== obj) // true
console.log(cloneObj.a !== obj.a) // false
console.log(cloneObj.b !== obj.b) // true
console.log(cloneObj.b.d !== obj.b.d) // true
console.log(cloneObj.f !== obj.f) // true
console.log(cloneObj.i !== obj.i) // true
console.log(cloneObj.k !== obj.k) // true
console.log(cloneObj.l !== obj.l) // false
console.log(cloneObj.m !== obj.m) // false
console.log(cloneObj.n !== obj.n) // true
console.log(cloneObj.n)
console.log(obj.n)

