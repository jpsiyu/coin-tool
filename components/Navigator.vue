<template>
  <div class="nav">
    <div class="nav-title" @click="toHome">
      <span>币管理工具</span>
    </div>
    <el-menu
      ref="menu"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-submenu v-for="(sub, subIndex) in tree" :key="subIndex" :index="sub.index">
        <template slot="title">
          <img class="nav-icon" :src="sub.icon" alt />
          <span>{{ sub.name }}</span>
        </template>
        <el-menu-item
          v-for="(item, itemIndex) in sub.children"
          :key="itemIndex"
          :index="item.index"
          @click="selectMenuItem(item)"
        >{{ item.name }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import navCfg from '@/assets/src/nav_config'
export default {
  data() {
    return {
      defaultActive: this.getDefault(),
      tree: []
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === '/') {
        this.$refs.menu.activeIndex = '/'
      }
    }
  },
  mounted() {
    this.tree = navCfg.indexedTree
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/' })
    },
    getDefault() {
      const routePath = this.$route.path
      const index = navCfg.hashedTree[routePath]
      const defaultActive = index || ''
      return defaultActive
    },
    selectMenuItem(eventData) {
      if (eventData.link) {
        this.$router.push({ path: eventData.link })
      }
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
  line-height: 68px;
  height: 68px;
  padding-left: 8%;
  cursor: pointer;
  user-select: none;
}

.nav-icon {
  width: 13px;
  height: 13px;
}

.nav .el-menu {
  border-right: 0;
  user-select: none;
}

.nav >>> .el-menu-item.is-active {
  background-color: #409eff !important;
}
</style>