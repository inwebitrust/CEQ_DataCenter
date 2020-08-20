<template>
  <div class="container">{{error}}
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: function () { return {} }
    }
  },
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
<style lang="scss" scoped>
body {
  background-color: #ffffff;
}
</style>
