<template>
  <div class="st">
    <div class="st-expand-wrap" @click="expand">
      <img class="st-expand" src="@/assets/icons/expand.png" alt />
    </div>
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
}

.st-expand-wrap{
  cursor: pointer;
  padding: 10px 30px 10px 20px;
}

.st-expand {
  width: 20px;
  height: 20px;
}
</style>