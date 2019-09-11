<template>
  <div class="st">
    <img
      class="st-expand"
      src="@/assets/icons/expand.png"
      alt=""
      @click="expand"
    >
  </div>
</template>

<script>
export default {
  methods: {
    expand() {
      this.$emit('expand')
    }
  }
}
</script>

<style scoped>
.st {
  height: 68px;
  width: 100%;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.st-expand {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>