const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: []
        },
        {
            val: 'c',
            children: [
                {
                    val: 'd',
                    children: []
                },
                {
                    val: 'e',
                    children: []
                },
            ]
        },
        {
            val: 'f',
            children: [
                {
                    val: 'g',
                    children: []
                },
                {
                    val: 'h',
                    children: []
                },
            ]
        },
    ]
}
// 深度遍历：递归
const dfs = (root) => {
    console.log(root.val);
    root.children.forEach((item) => {
        dfs(item)
    })
}
dfs(tree) //a b c d e f g h
console.log('------------');


// 广度遍历：队列
const bfs = (root) => {
    const q = []
    q.push(root)
    while (q.length > 0) {
        const n = q.shift()
        console.log(n.val);
        n.children.forEach(item => {
            q.push(item)
        })
    }
}
bfs(tree)//a b c f d e g h 