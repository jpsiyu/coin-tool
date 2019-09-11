<template>
  <div class="de">
    <div class="de-fit">
      <div class="de-nav" v-show="showNav">
        <Navigator />
      </div>
      <div class="de-main">
        <Status @expand="expand" />
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Navigator from '@/components/Navigator'
import Status from '@/components/Status'
export default {
  components: { Navigator, Status },
  data() {
    return {
      showNav: true
    }
  },
  methods: {
    expand() {
      this.showNav = !this.showNav
    }
  }
}
</script>

<style>
.de {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-x: auto;
  overflow-y: hidden;
}

.de-fit {
  display: flex;
  height: 100%;
  width: 100%;
  min-width: 968px;
}

.de-nav {
  background-color: #001529;
  width: 256px;
  height: 100%;
  overflow-y: auto;
}

.de-main {
  flex: 1;
  min-width: 768px;
  overflow-y: auto;
}
</style>
