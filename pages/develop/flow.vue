<template>
  <div class="flow">
    <el-form class="flow-form" label-position="top">
      <el-form-item label="助记词">
        <el-input v-model="mnemonic" type="textarea" :rows="3" placeholder="请输入助记词"></el-input>
      </el-form-item>
      <el-form-item label="助记词密码">
        <el-input v-model="password" placeholder="请输入助记词密码"></el-input>
      </el-form-item>
      <el-form-item label="生成老板节点">
        <Node :nodes="bossNodes" />
      </el-form-item>
      <el-row class="flow-index">
        <span>层级</span>
        <el-form-item>
          <el-input v-model="level" disabled></el-input>
        </el-form-item>
        <span>索引</span>
        <el-form-item>
          <el-input v-model="index"></el-input>
        </el-form-item>
      </el-row>
      <el-form-item label="派生财务节点">
        <Node :nodes="financeNodes" />
      </el-form-item>
      <el-form-item label="生成财务根节点">
        <Node :nodes="financeMasterNodes" />
      </el-form-item>
      <el-form-item label="财务私钥拆分" class="flow-split">
        <span>{{splits[0]}}</span>
        <span>{{splits[1]}}</span>
      </el-form-item>
      <el-form-item label="盐">
        <span>{{salt}}</span>
      </el-form-item>
      <el-form-item label="派生路径">
        <el-input v-model="derivePath" disabled></el-input>
      </el-form-item>
      <el-form-item label="派生用户节点">
        <Node :nodes="userNodes" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Node from '@/components/develop/Node'
const ethers = require('ethers')
const HDNode = ethers.utils.HDNode

export default {
  components: { Node },
  data() {
    return {
      mnemonic: '',
      password: '',
      level: 1,
      index: 0,
      bossNode: null,
      financeNode: null,
      financeMasterNode: null,
      splits: ['', ''],
      salt: '',
      derivePath: "m/44'/60'/0'/0",
      userNodes: []
    }
  },
  computed: {
    bossNodes() {
      if (!this.bossNode) return []
      return [this.bossNode]
    },
    financeNodes() {
      if (!this.financeNode) return []
      return [this.financeNode]
    },
    financeMasterNodes() {
      if (!this.financeMasterNode) return []
      return [this.financeMasterNode]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.mnemonic = this.randomMnemonic()
      this.password = this.randomPassword()
      this.bossNode = this.createNode(this.mnemonic, this.password)
      this.index = this.randomIndex()
      this.financeNode = this.deriveNode(this.bossNode, this.index)
      this.financeMasterNode = this.createNode(this.financeNode.mnemonic, '')
      this.splits = this.splitPrivKey(this.financeMasterNode.privateKey)
      this.salt = this.randomPassword()
      const tempList = []
      for (let i = 0; i < 10; i++) {
        const dpath = `${this.derivePath}/${i}`
        const node = this.deriveNode(this.financeMasterNode, dpath)
        tempList.push(node)
      }
      this.userNodes = tempList
      console.log(HDNode.mnemonicToEntropy(this.financeMasterNode.mnemonic))
    },
    randomMnemonic() {
      const wallet = ethers.Wallet.createRandom()
      return wallet.mnemonic
    },
    randomPassword() {
      const r = Math.random().toString(36).substring(7)
      return r
    },
    randomIndex() {
      return Math.floor(Math.random() * 10000)
    },
    createNode(mnemonic, password) {
      return HDNode.fromMnemonic(mnemonic, ethers.wordlists.en, password)
    },
    deriveNode(node, index) {
      return node.derivePath(index.toString())
    },
    splitPrivKey(key) {
      const split1 = '0x' + key.substring(2, 34)
      const split2 = '0x' + key.substring(34, 66)
      return [split1, split2]
    }
  }
}
</script>

<style scoped>
.flow-form {
  margin: 20px auto;
  padding: 10px;
  width: 960px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
}

.flow-nodeBtn {
  width: 100%;
}

.flow-row {
  display: flex;
}

.flow-index {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

.el-form-item {
  margin-bottom: 50px;
}

.flow-index .el-form-item {
  margin-bottom: 0;
  margin-right: 20px;
}

.flow-index span {
  display: inline-block;
  width: 40px;
  color: #606266;
  font-size: 14px;
}

.flow-split span {
  text-decoration: underline;
  color: #606266;
  margin-right: 20px;
}

.flow >>> .el-button,
.flow >>> .el-input__inner,
.flow >>> .el-textarea__inner {
  border-radius: 0;
}
</style>