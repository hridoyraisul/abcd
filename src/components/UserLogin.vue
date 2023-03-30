<template>
  <div class="container">
    <h1 class="text-center pt-3">User Login</h1>
    <div class="card card-body">
      <form @submit.prevent="formSubmit">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" v-model="email">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <button type="submit" class="btn btn-info" :class="{'disabled': submitStatus}">{{submitStatus ? 'Logging..' : 'Login'}}</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      submitStatus: false,

    };
  },
  mounted() {
    this.checkUser();
  },
  methods: {
    checkUser() {
      if (this.$root.token) {
        this.$router.push("/student-attendance");
      }
    },
    async formSubmit() {
      this.submitStatus = true;
      await axios
        .post(this.$apiBaseURL+"userLogin", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$toast(response.data.message);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          this.$root.user = response.data.data.user;
          this.$root.token = response.data.data.token;
          this.$router.push('/student-attendance');
        })
        .catch((error) => {
          this.$toast(error.response.data.message, "error");
        });
      this.submitStatus = false;
    },
  },
}
</script>

<style scoped>

</style>