# Handwritten

all 手写题

## 6-06

### 1. DOM 深度遍历

深度优先遍历 DOM 节点
DOM 元素类型：注释（Comment） 文本（Text） HTML（HTMLElement）
遍历思路：递归
从根节点开始遍历
判断当前节点是否有 child（node.childNodes.length>0）
有的话就往每一个 child 分别深度遍历

### 2. DOM 广度遍历

遍历思路：队列 先进先出
从根节点开始遍历 把跟节点入队列 queue（queue.push(root)）
当队列不为空时 循环进行如下操作：
把队列的队头元素 node 弹出队列
判断 node 是否有 child（node.childNodes.length>0）
有的话就往每一个 child 加入队列中
开启新一轮循环

### 3. 深度优先遍历查找 document.body 下面所有 class 为 a 的 dom 节点。

就是实现一下 document.querySelectorAll('.a') 的功能
关键：node.classList.contains('a') 当前元素下的 class 是否包含了'a'
深度优先遍历：注意需要返回一个 res 结果数组 所以这里我们 DFS 的参数包括了 node 节点以及 res 数组

### 4. 广度优先遍历查找 document.body 下面所有 class 为 a 的 dom 节点。

同理。

## 6-13

### 1. 手写 call 函数

1. 确定目标：Function.prototype.mycall 中 this 的指向：
2. 核心思想：给传进来的对象添加上 fullName 函数：
   `context.fn=this` //给传进来的对象添加一个方法 context.fn 它就等于我们的 fullName 函数
   `context.fn()` //执行 fullName 函数
   `delete context.fn` //记得把这个方法删除掉，因为我们不能改写了对象
3. 补充参数：call 的参数是一个一个传进来的
   `const args=[...arguments].slice(1)`
   `context.fn(...args)`

### 2. 手写 apply 函数

核心思想与 call 一样 不过 apply 是以数组的形式传递参数。
所以我们需要进行一下简单的判断

```javascript
if (args) res = context.fn(...args)
else res = context.fn()
```

### 3. 数组去重 O(n)

用 set、map 都可以
O(n^2):还可以用 indexOf includes

## 6-15

### 1.手写 instanceof

instanceof 是 JavaScript 中的运算符，用来判断一个对象是否是某个构造函数（或者是某个构造函数的子类、子孙类）的实例。如果一个对象是某个构造函数的实例，那么它一定具有该构造函数的所有属性和方法。

思路：

1. 如果传进来的 left 不是对象 或者为空，直接返回
2. 获取 left 的原型，即获取对象的原型：`let proto = Object.getPrototypeOf(obj);`
3. 遍历对象原型链，拿对象的原型与构造函数的 prototype 作比较：如果`proto === constructor.prototype`，那么就返回 true 直到遍历到 null。

### 2.手写深拷贝（Map、Set、Number、object） 避免循环引用

1. 函数 deepClone 接收两个参数，obj map 是一个用于记录已拷贝过的对象的 Map 对象，初始值为一个空的映射。
2. 对于对象 obj，首先进行类型判断，如果不是 Object 类型，或者是函数类型，则直接返回即可，不需要进行深拷贝。
3. 对于已经处理过的对象，我们需要先在 map 中查找，看是否存在对应的拷贝对象，如果有，直接返回已有的拷贝对象即可。
   如果 obj 是 Date 类型的对象，我们需要新建一个 Date 对象，并将其初始化为 obj 的值。对于其他类型的对象，也使用相应的判断
4. 使用 map.set 函数，将 obj 与其拷贝对象 map 映射起来，存储到 map 中。
5. 对于对象属性，我们需要递归调用 deepClone 函数，获取其拷贝对象，并赋值给拷贝对象 map 中的对应属性。对于非对象属性，则直接复制即可。
6. 最后返回拷贝对象 res

## 6-16

### 1.手写 发布订阅

Event 类：

- `on(eventName, fn)`：订阅事件，将事件名 eventName 和回调函数 fn 存储到 events 对象中，如果 eventName 对应的事件不存在，则初始化一个空数组。
- `emit(eventName, ...args)`：触发事件，获取 eventName 对应的所有回调函数 fns，并依次执行它们。
- `off(eventName, fn)`：移除事件，将 events 对象中 eventName 的回调函数数组中指定的回调函数 fn 移除，如果回调函数参数 fn 不传，则移除全部。
