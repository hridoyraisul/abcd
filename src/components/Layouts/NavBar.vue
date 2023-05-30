<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/student-attendance">SAS </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link  class="nav-link" aria-current="page" to="/student-attendance" active-class="active">Attendance</router-link>
          </li>
          <li class="nav-item">
            <router-link   class="nav-link" to="/student-list" active-class="active">Students</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user-list" active-class="active">Users</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <strong class="text-white">{{name}}</strong> &nbsp;&nbsp;
          <button @click="logout" type="button" class="btn btn-outline-light btn-sm">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    const userStore = useUserStore();
    return {
      name: userStore.getUserName || '',
    }
  },
  methods: {
     logout() {
      axios.post(this.$apiBaseURL+'userLogout', {
        user: this.$root.user,
        token: this.$root.token
      }, {
        headers: {
          Authorization: `Bearer ${this.$root.token}`
        }
      }).then((response) => {
        this.$root.token = null;
        this.$root.user = {};
        this.$toast(response.data.message);
        this.$router.push('/');
      }).catch((error) => {
        this.$toast(error.response.data.message, "error");
      });
    }
  }
}
</script>

<style scoped>

</style>