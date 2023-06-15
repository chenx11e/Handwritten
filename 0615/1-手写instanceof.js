function myInstanceof (left, right) {
  //基本数据类型都返回false
  if (typeof left !== 'object' || left === null) return false
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left)
  // 遍历原型链
  while (true) {
    // 遍历到原型链的最上层null了 就返回false
    if (proto === null) return false
    // 找到目标构造函数的原型了 返回true
    if (proto === right.prototype) return true
    // 继续往上遍历
    proto = Object.getPrototypeOf(proto)
  }
}
console.log(myInstanceof([], Array))
console.log(myInstanceof({}, Array))
console.log(myInstanceof([], Object))
console.log(myInstanceof({}, Object))
console.log(myInstanceof(123, Object))


