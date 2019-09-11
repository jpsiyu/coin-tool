
const tree = [
  {
    name: '管理',
    icon: require('@/assets/icons/manage.png'),
    link: '',
    children: [
      {
        name: '币账户创建',
        link: '',
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

export default {
  tree
}