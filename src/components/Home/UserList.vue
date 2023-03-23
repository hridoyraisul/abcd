<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target=".userAddModal">
    New User
  </button>
  <UserTable :users="users"/>

  <!-- Modal start-->
  <div class="modal fade userAddModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Add New User</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form v-on:submit.prevent="userCreateForm">
          <div class="modal-body">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" v-model="name" id="name">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="email" id="email">
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
import UserTable from "@/components/Home/userComponents/UserTable.vue";
import Swal from "sweetalert2";


const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "fdkgdlsfkmb@abcd.com",
  },
  {
    id: 2,
    name: "John Doe2",
    email: "fdkgdlsfkmb@abcd.com",
  },
  {
    id: 3,
    name: "John Doe3",
    email: "fdkgdlsfkmb@abcd.com",
  },
  {
    id: 4,
    name: "John Doe4",
    email: "fdkgdlsfkmb@abcd.com",
  },
  {
    id: 5,
    name: "John Doe5",
    email: "fdkgdlsfkmb@abcd.com",
  }
];



export default {
  name: "UserList",
  components: {
    UserTable
  },
  methods: {
    userCreateForm(){
      if (this.name === "" || this.email === "") {
        Swal.fire({
          title: 'Failed!',
          text: 'Please fill all the fields!',
          icon: 'error'
        })
        return;
      }
      const user = {
        id: this.users.length + 1,
        name: this.name,
        email: this.email,
      }
      this.users.push(user);
      this.name = "";
      this.email = "";
      Swal.fire({
        title: 'Success!',
        text: 'User added successfully!',
        icon: 'success'
      })

    }
  },
  data(){
    return {
      users: userData,
      name: "",
      email: "",
    }
  }
}
</script>

<style scoped>

</style>