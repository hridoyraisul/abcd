<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/student-attendance">LOGO</router-link>
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
          <strong class="text-white">{{userInfo?.name}}</strong> &nbsp;&nbsp;
          <button type="button" class="btn btn-outline-light btn-sm">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    userInfo: {
      type: Object,
      required: true
    },
  }
}
</script>

<style scoped>

</style>