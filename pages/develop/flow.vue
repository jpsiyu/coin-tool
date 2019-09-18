<template>
  <div class="flow">
    <el-form class="flow-form" label-position="top">
      <el-form-item label="助记词">
        <el-input v-model="form.mnemonic" type="textarea" :rows="3" placeholder="请输入助记词"></el-input>
      </el-form-item>
      <el-form-item label="助记词密码">
        <el-input v-model="form.password" placeholder="请输入助记词密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="flow-nodeBtn" type="primary">生成HDNode</el-button>
      </el-form-item>
      <el-form-item label="HDNode">
        <HDNode />
      </el-form-item>
      <el-form-item label="派生路径">
        <div class="flow-row">
          <span>层级 1</span>
          <el-input></el-input>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import HDNode from '@/components/develop/HDNode'
export default {
  components: { HDNode },
  data() {
    return {
      form: {
        mnemonic: '',
        password: '',
      }
    }
  }
}
</script>

<style scoped>
.flow-form {
  margin: 20px auto;
  padding: 10px;
  width: 600px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
}

.flow-nodeBtn {
  width: 100%;
}

.flow-row {
  display: flex;
}

.flow >>> .el-button,
.flow >>> .el-input__inner,
.flow >>> .el-textarea__inner {
  border-radius: 0;
}
</style>