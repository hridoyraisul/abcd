<template>
  <div class="user-table">
    <table class="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,index) in users" :key="user.id">
          <th scope="row">{{ index+1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button type="button" @click="processEdit(user)" class="btn btn-primary">
              Edit
            </button>
            <button @click="processDelete(user)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal start-->
  <BSModal ref="userEditModal" @formSubmit="submitEditForm">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" v-model="userData.name" id="name">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" v-model="userData.email" id="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">New Password</label>
      <input type="password" class="form-control" v-model="userData.password" id="password">
    </div>
  </BSModal>
  <!--Modal end-->


</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
import BSModal  from "@/components/BSModal.vue";
import {apiBaseURL} from "@/helper.js";

export default {
  name: "UserTable",
  data() {
    return {
      userData: {
        id: "",
        name: "",
        email: "",
        password: ""
      }
    };
  },
  components: {
    BSModal
  },
  props: {
    users: {
      type: Array,
      required: true,
    }
  },
  emits: ['user-reload'],
  methods: {
    submitEditForm() {
      if (this.userData.name === "" || this.userData.email === "") {
        this.$swal("Please fill all the fields!","error", "Validation Error!");
        return;
      }
      axios.put(apiBaseURL + "updateUser/" + this.userData.id,{
        id: this.userData.id,
        name: this.userData.name,
        email: this.userData.email,
        password: this.userData.password,
      }).then(response => {
        this.$refs.userEditModal.modal('hide');
        this.$emit('user-reload');
        this.$swal(response.data.message);
      }).catch(error => {
        this.$swal(error.response.data.message,"error");
      });
    },
    processEdit(user) {
      this.userData = {...user};
      this.$refs.userEditModal.modal('show');
    },
    processDelete(user) {
      this.$swal("After removing "+user.name+" it will be lost","delete", "Want to remove this user?")
          .then((t) => {
        if (t.value === true) {
          axios.delete(apiBaseURL + "deleteUser/" + user.id).then(response => {
            this.$swal(response.data.message,"success",'Deleted!');
            this.$emit('user-reload');
          }).catch(error => {
            this.$swal(error.response.data.message,"error");
          });
        } else {
          t.dismiss===Swal.DismissReason.cancel
          &&
          this.$swal("This user is safe now","error","Cancelled!");
        }
      });
    },
  },
}
</script>

<style scoped>

</style>