Function.prototype.mycall = function (context) {
  console.log(this) //[Function: fullName]
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)

  const res = context.fn(...args)
  delete context.fn
  return res
}

Function.prototype.myApply = function (context, args) {
  context = context || window
  context.fn = this
  let res
  if (args)
    res = context.fn(...args)
  else
    res = context.fn()
  delete context.fn
  return res

}


var person =
{
  firstName: "John",
  lastName: "Doe",
  fullName: function (a, b, c) {
    return this.firstName + " " + this.lastName + "a:" + a + "b:" + b + "c:" + c
  }
}
var person2 = {
  firstName: "Mary",
  lastName: "Doe"
}
console.log(person.fullName())// John Doe
console.log(person.fullName.call(person2, 1, 2, 3))//Mary Doe
console.log(person.fullName.mycall(person2, 1, 2, 3))
console.log('-------------')
console.log(person.fullName.apply(person2, [1, 2, 3]))//Mary Doe
console.log(person.fullName.myApply(person2, [1, 2, 3]))

