<template>
  <div class="flow">
    <h3>老板的输入</h3>
    <el-form class="flow-form" label-position="right" size="small" label-width="150px">
      <el-form-item label="老板输入助记词">
        <el-input
          class="flow-area__w"
          v-model="mnemonic"
          type="textarea"
          :rows="3"
          placeholder="请输入助记词"
        ></el-input>
      </el-form-item>
      <el-form-item label="老板输入密码">
        <el-input class="flow-input__w" v-model="password" placeholder="请输入助记词密码"></el-input>
      </el-form-item>
      <el-form-item label="生成节点M0">
        <Node :nodes="bossNodes" />
      </el-form-item>
      <el-form-item label="默认层级">
        <el-input class="flow-input__w" v-model="level" disabled></el-input>
      </el-form-item>
      <el-form-item label="老板指定财务索引">
        <el-input class="flow-input__w" v-model="index"></el-input>
      </el-form-item>
    </el-form>
    <h3>财务私钥生成与拆分</h3>
    <el-form class="flow-form" label-position="right" size="small" label-width="150px">
      <el-form-item label="派生财务节点">
        <Node :nodes="financeNodes" />
      </el-form-item>
      <el-form-item label="生成财务根节点M1">
        <Node :nodes="financeMasterNodes" />
      </el-form-item>
      <el-form-item label="财务私钥拆分" class="flow-split">
        <span>{{splits[0]}}</span>
        <span>{{splits[1]}}</span>
      </el-form-item>
      <el-form-item label="生成32位的盐">
        <span>{{salt}}</span>
      </el-form-item>
      <el-form-item label="split1 + 盐">
        <span>{{split1salt}}</span>
      </el-form-item>
      <el-form-item label="财务保管的节点M1'">
        <Node :nodes="financeKeepNodes" />
      </el-form-item>
    </el-form>
    <h3>用户私钥派生</h3>
    <el-form class="flow-form" label-position="right" size="small" label-width="150px">
      <el-form-item label="派生路径">
        <el-input class="flow-input__w" v-model="derivePath" disabled></el-input>
      </el-form-item>
      <el-form-item label="派生用户节点">
        <NodeTable :nodes="userNodes" />
      </el-form-item>
    </el-form>
    <h3>财务私钥还原</h3>
    <el-form class="flow-form" label-position="right" size="small" label-width="150px">
      <el-form-item label="财务输入助记词" v-if="financeKeepNode">
        <el-input
          class="flow-area__w"
          v-model="financeKeepNode.mnemonic"
          type="textarea"
          :rows="3"
          placeholder="请输入助记词"
        ></el-input>
      </el-form-item>
      <el-form-item label="财务助记词16进制">
        <span>{{entropy}}</span>
      </el-form-item>
      <el-form-item label="拆分，减去盐">
        <span>{{recoverSplit1}}</span>
      </el-form-item>
      <el-form-item label="合并split2，还原私钥">
        <span>{{recoverFinanceMasterKey}}</span>
      </el-form-item>
    </el-form>
    <div class="flow-chart">
      <img src="@/assets/images/flow.jpg" alt />
    </div>
  </div>
</template>

<script>
import Node from '@/components/develop/Node'
import NodeTable from '@/components/develop/NodeTable'
const ethers = require('ethers')
const HDNode = ethers.utils.HDNode

export default {
  components: { Node, NodeTable },
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
      split1salt: '',
      financeKeepNode: null,
      derivePath: "m/44'/60'/0'/0",
      userNodes: [],
      financeRecoverNode: null,
      entropy: '',
      recoverSplit1: '',
      recoverFinanceMasterKey: ''
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
    },
    financeKeepNodes() {
      if (!this.financeKeepNode) return []
      return [this.financeKeepNode]
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
      this.salt = '0xabcdabcd'
      this.split1salt = '0x' + this.splits[0].substring(2) + this.salt.substring(2)
      this.financeKeepNode = HDNode.fromMnemonic(HDNode.entropyToMnemonic(this.split1salt))

      this.entropy = HDNode.mnemonicToEntropy(this.financeKeepNode.mnemonic)
      const len = this.entropy.length
      this.recoverSplit1 = this.entropy.substring(0, len - 8)
      this.recoverFinanceMasterKey = '0x' + this.recoverSplit1.substring(2) + this.splits[1].substring(2)

      const tempList = []
      for (let i = 0; i < 10; i++) {
        const dpath = `${this.derivePath}/${i}`
        const node = this.deriveNode(this.financeMasterNode, dpath)
        tempList.push(node)
      }
      this.userNodes = tempList
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
    },
    hexEncode(str) {
      let hex, i
      let result = ""
      for (i = 0; i < str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
      }
      return result
    },
    hexDecode(str) {
      let j
      let hexes = str.match(/.{1,4}/g) || [];
      let back = "";
      for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
      }
      return back;
    },
    num2hex(number) {
      return number.toString(16)
    },
    hex2num(hex) {
      return parseInt(hex, 16)
    }
  }
}
</script>

<style scoped>
.flow {
  color: #606266;
}

.flow h3 {
  padding: 10px 20px;
}

.flow-form {
  margin: 20px auto 50px auto;
  padding: 20px 10px;
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

.flow-index .el-form-item {
  margin-bottom: 0;
  margin-right: 20px;
}

.flow-index span {
  display: inline-block;
  width: 40px;
  font-size: 14px;
}

.flow-split span {
  text-decoration: underline;
  margin-right: 20px;
}

.flow-chart img {
  width: 100%;
}

.flow >>> .el-button,
.flow >>> .el-input__inner,
.flow >>> .el-textarea__inner {
  border-radius: 0;
}

.flow-area__w {
  width: 300px;
}

.flow-input__w {
  width: 300px;
}
</style>