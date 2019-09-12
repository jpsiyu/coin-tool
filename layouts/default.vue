<template>
  <div class="de">
    <div class="de-fit">
      <div class="de-nav" :class="{'de-nav--left': !showNav}">
        <Navigator />
      </div>
      <div class="de-main" :class="{'de-main--full': !showNav}">
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
  position: relative;
}

.de-nav {
  background-color: #001529;
  height: 100%;
  width: 30%;
  overflow-y: auto;
  transition: transform 0.5s ease-in-out;
}

.de-nav--left {
  transform: translateX(-100%);
}

.de-main {
  position: absolute;
  left: 30%;
  width: 70%;
  overflow-y: auto;
  transition-property: width, left;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out
}

.de-main--full {
  left: 0;
  width: 100%;
}
</style>
