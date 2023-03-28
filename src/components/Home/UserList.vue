<template>
  <button type="button" class="btn btn-primary" @click="processUserCreateForm">
    New User
  </button>
  <UserTable :users="users" @user-reload="fetchUsers"/>

  <!-- Modal start-->
  <BSModal ref="userEditModal" @formSubmit="userCreateFormSubmit">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" v-model="name" id="name">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" v-model="email" id="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" v-model="password" id="password">
    </div>
  </BSModal>
  <!--Modal end-->

</template>

<script>
import UserTable from "@/components/Home/userComponents/UserTable.vue";
import axios from "axios";
import {apiBaseURL} from "@/helper.js";
import BSModal from "@/components/BSModal.vue";
export default {
  name: "UserList",
  components: {
    UserTable,
    BSModal
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    processUserCreateForm(){
      this.$refs.userEditModal.modal('show');
    },
    userCreateFormSubmit(){
      if (this.name === "" || this.email === "") {
        this.$swal("Please fill all the fields!","error", "Validation Error!");
        return;
      }
      axios.post(apiBaseURL+'userRegister', {
        name: this.name,
        email: this.email,
        password: this.password,
      }).then(response => {
        this.fetchUsers();
        this.name = "";
        this.email = "";
        this.password = "";
        this.$refs.userEditModal.modal('hide');
        this.$swal(response.data.message);
      }).catch(error => {
        this.$swal(error.response.data.message,"error");
      });
    },
    fetchUsers() {
      axios.get(apiBaseURL+'allUsers')
          .then(response => {
            this.users = response.data.data.data;
          })
          .catch(error => {
            console.log(error.response.data.message);
          });
    }
  },
  data(){
    return {
      users: [],
      name: "",
      email: "",
      password: "",
    }
  }
}
</script>

<style scoped>

</style>