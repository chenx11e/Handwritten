// map
function uniqueArrMap (arr) {
  const map = new Map()
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true)
      res.push(arr[i])
    }
  }
  return res
}

// set
function uniqueArrSet (arr) {
  return [...new Set(arr)]
}

// indexOf O(n^2)
function uniqueArrIndexOf (arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}

// includes 

// indexOf+filter
function uniqueArrFilter (arr) {
  let res = arr.filter((item, index) => arr.indexOf(item) === index)
  return res
}

console.log(uniqueArrMap([1, 2, 3, 4, 5, 6, 7]))
console.log(uniqueArrMap([1, 2, 2, 6, 5, 6, 7]))
console.log('-------------')
console.log(uniqueArrSet([1, 2, 3, 4, 5, 6, 7]))
console.log(uniqueArrSet([1, 2, 2, 6, 5, 6, 7]))
console.log('-------------')
console.log(uniqueArrIndexOf([1, 2, 3, 4, 5, 6, 7]))
console.log(uniqueArrIndexOf([1, 2, 2, 6, 5, 6, 7]))

console.log('-------------')
console.log(uniqueArrFilter([1, 2, 3, 4, 5, 6, 7]))
console.log(uniqueArrFilter([1, 2, 2, 6, 5, 6, 7]))

