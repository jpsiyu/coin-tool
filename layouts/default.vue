<template>
  <div class="de">
    <div class="de-nav" v-show="showNav">
      <Navigator/> 
    </div>
    <div class="de-main">
      <Status @expand="expand" />
      <nuxt />
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
  display: flex;
}

.de-nav{
  background-color: #001529;
  width: 256px;
  height: 100%;
}

.de-main {
  flex: 1;
}
</style>
