<template>
  <div class="acc">
    <h1>Account Create</h1>
    <div class="acc-list">
      <p v-for="(item, index) in articles" :key="index">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: []
    }
  },
  mounted() {
    this.getAnnouce()
  },
  methods: {
    getAnnouce() {
      const url = 'https://xobull.zendesk.com/api/v2/help_center/zh-cn/sections/360006084932/articles.json'
      return this.$axios.get(url)
        .then(res => {
          this.articles = res.articles
        })
    }
  }
}
</script>

<style scoped>
.acc{
  padding: 20px;
}
</style>