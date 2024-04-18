<template>
  <div id="app">
    <AdminPage  v-if="this.roles == 'ROLE_ADMIN'"/>
    <UserPage v-else/>
  </div>
</template>

<script>
import UserPage from './components/UserPage.vue'
import AdminPage from './components/AdminPage.vue';
export default {
  name: 'App',
  components: {
    UserPage,
    AdminPage
  },
  mounted() {
    this.$store.dispatch('fetchListCourseCategory');

  },
  
  data() {
    return {
      current: localStorage.getItem('accessToken'),
      roles: localStorage.getItem('role'),
    }
  }
}
</script>

<style>

</style>
