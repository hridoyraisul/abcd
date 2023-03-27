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
<!--  <div class="modal fade userEditModal" :class="{ 'show': showModal }"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">-->
<!--    <div class="modal-dialog">-->
<!--      <div class="modal-content">-->
<!--        <div class="modal-header">-->
<!--          <h1 class="modal-title fs-5" id="staticBackdropLabel">Update User</h1>-->
<!--          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--        </div>-->
<!--        <form v-on:submit.prevent="userForm">-->
<!--          <div class="modal-body">-->

<!--              <div class="mb-3">-->
<!--                <label for="name" class="form-label">Name</label>-->
<!--                <input type="text" class="form-control" v-model="userData.name" id="name">-->
<!--              </div>-->
<!--              <div class="mb-3">-->
<!--                <label for="email" class="form-label">Email</label>-->
<!--                <input type="email" class="form-control" v-model="userData.email" id="email">-->
<!--              </div>-->
<!--              <div class="mb-3">-->
<!--                <label for="password" class="form-label">Password</label>-->
<!--                <input type="password" class="form-control" v-model="password" id="password">-->
<!--              </div>-->
<!--          </div>-->
<!--          <div class="modal-footer">-->
<!--            <button type="button" @click="showModal= false" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>-->
<!--            <button type="submit" class="btn btn-info">Save</button>-->
<!--          </div>-->
<!--        </form>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <!--Modal end-->

  <BSModal ref="userEditModal">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" v-model="userData.name" id="name">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" v-model="userData.email" id="email">
    </div>
  </BSModal>

</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
import BSModal  from "@/components/BSModal.vue";

export default {
  name: "UserTable",
  components: {
    BSModal
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
    fetchUsers: {
      type: Function,
      required: true,
    },
  },
  methods: {
    userForm: function () {
      if (this.name === "" || this.email === "") {
        Swal.fire({
          title: 'Failed!',
          text: 'Please fill all the fields!',
          icon: 'error'
        })
        return;
      }
      axios.put("http://127.0.0.1:8000/api/updateUser/" + this.userData.id,{
        id: this.userData.id,
        name: this.userData.name,
        email: this.userData.email,
        password: this.password,
      }).then(response => {
        this.showModal = false;
        Swal.fire({
          title: 'Updated!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }).catch(error => {
        Swal.fire({
          title: 'Failed!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
    },
    processEdit(user) {
      this.userData = {...user};
      this.$refs.userEditModal.modal('show');
      this.showModal = true;
    },
    processDelete(user) {
      Swal.fire({
        title:"Want to remove?",
        text:"After removing "+user.name+" it will be lost",
        type:"question",
        icon: 'question',
        confirmButtonColor:"#348cd4",
        showCancelButton:!0,
        confirmButtonText:"Yes, delete it!",
        cancelButtonText:"No, cancel!",
        confirmButtonClass:"btn sa-success btn-success mt-2 mr-2",
        cancelButtonClass:"btn sa-error btn-danger ml-2 mt-2",
        buttonsStyling:!1
      }).then(function(t){
        if (t.value === true) {
          axios.delete("http://127.0.0.1:8000/api/deleteUser/" + user.id).then(response => {
            Swal.fire({
              title: "Deleted!",
              icon: 'success',
              text: response.data.message,
              type: "success",
            });
          }).catch(error => {
            Swal.fire({
              title: "Failed!",
              icon: 'error',
              text: error.response.data.message,
              type: "error",
            });
          });
        } else {
          t.dismiss===Swal.DismissReason.cancel&&Swal.fire({
            title:"Cancelled",
            icon: 'error',
            text:"This user is safe now",
            type:"error",
          });
        }
      });
    }
  },
  data() {
    return {
      userData: {
        id: "",
        name: "",
        email: "",
      },
      showModal: false,
    };
  },
}
</script>

<style scoped>

</style>