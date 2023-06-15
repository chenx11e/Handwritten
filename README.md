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

### 1.手写instanceof

instanceof 是JavaScript中的运算符，用来判断一个对象是否是某个构造函数（或者是某个构造函数的子类、子孙类）的实例。如果一个对象是某个构造函数的实例，那么它一定具有该构造函数的所有属性和方法。

思路：

1. 如果传进来的left不是对象 或者为空，直接返回
2. 获取left的原型，即获取对象的原型：`let proto = Object.getPrototypeOf(obj);`
3. 遍历对象原型链，拿对象的原型与构造函数的prototype作比较：如果`proto === constructor.prototype`，那么就返回true 直到遍历到null。

### 2.下拉刷新和触底加载

当用户在移动端下拉页面到达顶部时，会触发下拉刷新的功能，重新加载最新的数据。当用户滚动页面到达底部时，会触发触底加载的功能，加载更多的数据。

具体实现：

1. 定义了两个变量 `isLoading` 和 `isRefreshing`，用于标记当前是否在加载数据和刷新数据中，防止同时发起多个请求。
2. 定义了一个 `loadData` 函数，用于加载更多的数据。当加载数据时，先判断当前是否正在加载数据，避免重复请求。然后通过 `setTimeout` 模拟异步请求数据，向列表中添加10个新的列表项，最后将 `isLoading` 变量设置为 `false`，表示加载数据完成。
3. 定义了一个 `refreshData` 函数，用于下拉刷新数据。当下拉刷新时，先判断当前是否正在刷新数据，避免重复请求。然后通过 `setTimeout` 模拟异步请求数据，清空列表中原有的内容，重新加载数据，最后将 `isRefreshing` 变量设置为 `false`，表示刷新数据完成。
4. 给窗口添加了 `scroll` 事件监听器，当页面滚动到底部时触发 `loadData` 函数，加载更多的数据。
5. 给页面顶部的内容容器 `content` 添加了 `touchstart` 事件监听器，记录下当前触摸的位置。在触摸移动时，如果滑动到页面的顶部，且滚动条的位置为0，就认为用户进行了下拉刷新，此时触发 `refreshData` 函数，刷新数据。
6. 最后，在页面加载完毕后，调用 `loadData` 函数，首次加载数据。
