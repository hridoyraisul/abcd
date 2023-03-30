<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.authCheck();
  },
  methods: {
    authCheck() {
      if (!this.$root.token && !localStorage.getItem('token')) {
        this.$router.push('/');
      } else if (!localStorage.getItem('token')) {
        this.$router.push('/');
      } else {
        this.$root.token = localStorage.getItem('token');
        this.$root.user = JSON.parse(localStorage.getItem('user'));
      }
    }
  }
}
</script>
<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>

