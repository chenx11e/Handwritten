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
