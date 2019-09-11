<template>
  <div class="nav">
    <div class="nav-title">
      <span>币管理工具</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span>Navigator Three</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

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

.nav .el-menu{
  border-right: 0;
}

.nav >>> .el-menu-item.is-active {
  background-color: #409eff !important;
}
</style>