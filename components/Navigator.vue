<template>
  <div class="nav">
    <div class="nav-title">
      <span>币管理工具</span>
    </div>
    <el-menu
      default-active="0-0"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-submenu
        v-for="(sub, subIndex) in tree"
        :key="subIndex"
        :index="String(subIndex)"
      >
        <template slot="title">
          <img class="nav-icon" :src="sub.icon" alt="">
          <span>{{sub.name}}</span>
        </template>
        <el-menu-item
          v-for="(item, itemIndex) in sub.children"
          :key="itemIndex"
          :index="subIndex+'-'+itemIndex"
        >{{item.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import navCfg from '@/assets/src/nav_config'
export default {
  data() {
    return {
      tree: navCfg.tree
    }
  }
}
</script>

<style scoped>
.nav-title {
  background-color: #002847;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  line-height: 68px;
  height: 68px;
}

.nav-icon{
  width: 13px;
  height: 13px;
}

.nav .el-menu {
  border-right: 0;
}

.nav >>> .el-menu-item.is-active {
  background-color: #409eff !important;
}
</style>