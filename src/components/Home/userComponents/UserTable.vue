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
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="processEdit(user)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target=".userEditModal">
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
  <div class="modal fade userEditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Update User</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form v-on:submit.prevent="userForm">
          <div class="modal-body">

              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" v-model="userData.name" id="name">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="userData.email" id="email">
              </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-info">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--Modal end-->
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: "UserTable",
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    userForm(){
      if (this.name === "" || this.email === "") {
        Swal.fire({
          title: 'Failed!',
          text: 'Please fill all the fields!',
          icon: 'error'
        })
        return;
      }
      Swal.fire({
        title: 'Updated!',
        text: 'User has been updated with ['+this.userData.name+', '+this.userData.email+']',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },
    processEdit(user) {
      this.userData = {...user};
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
          Swal.fire({
            title: "Deleted!",
            icon: 'success',
            text: 'Successfully removed user!',
            type: "success",
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
    };
  },
}
</script>

<style scoped>

</style>