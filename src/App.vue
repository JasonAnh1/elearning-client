<template>
  <div id="app">
    <UserPage />
  </div>
</template>

<script>
import UserPage from './components/UserPage.vue'

export default {
  name: 'App',
  components: {
    UserPage
  },
  mounted() {
    this.$store.dispatch('fetchListCourseCategory');
  },
}
</script>

<style>

</style>
