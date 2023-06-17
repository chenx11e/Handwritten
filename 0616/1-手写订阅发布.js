class Event {
  constructor() {
    this.events = {}
  }

  // 订阅事件
  on (eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  }

  // 触发事件
  emit (eventName, ...args) {
    // fns 包含所有订阅事件 eventName 的回调函数数组
    const fns = this.events[eventName]
    // 事件不存在直接返回
    if (!fns) {
      return
    }

    fns.forEach(fn => {
      // 去执行每一个回调函数 将函数 fn 内部的 this 绑定到当前事件对象上
      fn.apply(this, args)
    })
  }

  // 移除事件
  off (eventName, fn) {
    const fns = this.events[eventName]
    if (!fns) {
      return
    }

    // 移除事件回调函数 如果回调函数参数 fn 不传，则移除全部。
    if (!fn) {
      delete this.events[eventName]
    } else {
      const index = fns.indexOf(fn)
      if (index !== -1) {
        fns.splice(index, 1)
      }
    }
  }
}

// 使用
const eventBus = new Event()
const fn1 = function () {
  console.log("订阅1")
}
const fn2 = function () {
  console.log("订阅2")
}
const fn3 = function () {
  console.log("订阅3")
}

eventBus.on("test", fn1)
eventBus.on("test", fn2)
eventBus.on("test", fn3)

eventBus.emit("test") // 订阅1\n订阅2\n订阅3

eventBus.off("test", fn2)

eventBus.emit("test") // 订阅1\n订阅3