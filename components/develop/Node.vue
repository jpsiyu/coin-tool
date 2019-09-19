<template>
  <div class="node">
    <el-table :data="nodes" border>
      <el-table-column prop="privateKey" label="Private Key"></el-table-column>
      <el-table-column prop="publicKey" label="Public Key"></el-table-column>
      <el-table-column prop="chainCode" label="Chain Code"></el-table-column>
      <el-table-column prop="path" label="Path" width="130px"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['nodes'],
  data() {
    return {}
  }
}
</script>