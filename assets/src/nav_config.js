
const tree = [
  {
    name: '管理',
    icon: require('@/assets/icons/manage.png'),
    link: '',
    children: [
      {
        name: '币账户创建',
        link: '/account',
      },
      {
        name: '币资金入库',
        link: '',
      },
      {
        name: '虚拟币出入库记录',
        link: '',
      }
    ]
  },
  {
    name: '设置',
    icon: require('@/assets/icons/setting.png'),
    children: [
      {
        name: '用户与角色',
        link: ''
      },
      {
        name: '入库地址设置',
        link: ''
      },
      {
        name: '提币出账设置',
        link: ''
      },
      {
        name: '手续费出账设置',
        link: ''
      },
      {
        name: '助记词设置',
        link: ''
      },
    ]
  }
]

const indexTree = (tree) => {
  const newTree = []
  tree.forEach((_node, index) => {
    const node = Object.assign({}, _node)
    node.index = String(index)
    node.children.forEach((subNode, subIndex) => {
      subNode.index = index + '-' + subIndex
    })
    newTree.push(node)
  })
  return newTree
}

const hashTree = (tree) => {
  const newTree = {}
  tree.forEach(node => {
    node.children.forEach(subNode => {
      if (subNode.link && subNode.index) {
        newTree[subNode.link] = subNode.index
      }
    })
  })
  return newTree
}

const indexedTree = indexTree(tree)
const hashedTree = hashTree(indexedTree)

export default {
  tree,
  indexedTree,
  hashedTree,
}