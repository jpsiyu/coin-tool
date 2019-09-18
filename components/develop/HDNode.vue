<template>
  <div class="node">
    <el-table :data="node" border>
      <el-table-column prop="privateKey" label="Private Key"></el-table-column>
      <el-table-column prop="publicKey" label="Public Key"></el-table-column>
      <el-table-column prop="chainCode" label="Chain Code"></el-table-column>
      <el-table-column prop="path" label="Path"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      node: [{
        privateKey: '123',
        publicKey: 'abc',
        chainCode: '0xjidewf234j24',
        path: 'm/44'
      }]
    }
  }
}
</script>