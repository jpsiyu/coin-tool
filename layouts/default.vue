<template>
  <div class="de">
    <Navigator />
    <nuxt />
  </div>
</template>

<script>
import Navigator from '@/components/Navigator'
export default {
  components: { Navigator }
}
</script>

<style>

.de{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
}
</style>
