<template>
  <NavBar/>
  <button type="button" class="btn btn-primary" @click="processUserCreateForm">
    + New
  </button>
  <div class="d-flex text-center " :class="`${spinner ? '':'d-none'}`">
    <div class="spinner-border" role="status">
    </div>
    <strong class="ms-1">Loading...</strong>
  </div>

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

  <Pagination :totalItems="totalUsers" :itemsPerPage="itemsPerPage" @page-change="fetchUsers" ></Pagination>

  <!-- Modal start-->
  <BSModal ref="userModal" @formSubmit="userFormSubmit">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" v-model="userInfo.name">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" v-model="userInfo.email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" v-model="userInfo.password">
    </div>
  </BSModal>
  <!--Modal end-->

</template>

<script>
import axios from "axios";
import BSModal from "@/components/BSModal.vue";
import NavBar from "@/components/Layouts/NavBar.vue";
import Pagination from "@/components/pagination.vue";
export default {
  name: "UserList",
  components: {
    NavBar,
    BSModal,
    Pagination
  },
  data(){
    return {
      users: [],
      userInfo: {
        name: "",
        email: "",
        password: ""
      },
      spinner: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalUsers: 0
    }
  },
  mounted() {
    this.fetchUsers(this.currentPage);
  },
  methods: {
    processUserCreateForm(){
      this.$refs.userModal.modal('show');
    },
    userFormSubmit(){
      if (this.name === "" || this.email === "") {
        this.$swal("Please fill all the fields!","error", "Validation Error!");
        return;
      }
      if (this.userInfo.id) {
         axios.put(this.$apiBaseURL + "updateUser/" + this.userInfo.id,this.userInfo,{
           headers: {
             'Authorization': `Bearer ${this.$root.token}`
           }
         }).then(response => {
           this.fetchUsers(this.currentPage);
           this.$refs.userModal.modal('hide');
          this.$swal(response.data.message);
        }).catch(error => {
          this.$swal(error.response.data.message,"error");
        });
      } else {
        axios.post(this.$apiBaseURL+'userRegister', this.userInfo,{
          headers: {
            'Authorization': `Bearer ${this.$root.token}`
          }
        }).then(response => {
          this.fetchUsers(this.currentPage);
          Object.keys(this.userInfo).forEach(key => this.userInfo[key] = "");
          this.$refs.userModal.modal('hide');
          this.$swal(response.data.message);
        }).catch(error => {
          this.$swal(error.response.data.message,"error");
        });
      }
    },
    async fetchUsers(currentPage) {
      this.spinner = true;
      await axios.get(this.$apiBaseURL+'allUsers?page='+currentPage,{
        headers: {
          'Authorization': `Bearer ${this.$root.token}`
        }
      })
          .then(response => {
            this.users = response.data.data.data;
            this.totalUsers = response.data.data.total;
          })
          .catch(error => {
            console.log(error.response.data.message);
          });
      this.spinner = false;
    },
    processEdit(user) {
      this.userInfo = {...user};
      this.$refs.userModal.modal('show');
    },
    processDelete(user) {
      this.$swal("After removing "+user.name+" will be lost","delete", "Want to remove this user?")
          .then((t) => {
            if (t.value === true) {
              axios.delete(this.$apiBaseURL + "deleteUser/" + user.id,{
                headers: {
                  'Authorization': `Bearer ${this.$root.token}`
                }
              }).then(response => {
                this.$swal(response.data.message,"success",'Deleted!');
                this.fetchUsers(this.currentPage);
              }).catch(error => {
                this.$swal(error.response.data.message,"error");
              });
            } else {
              this.$swal("This user is safe now","error","Cancelled!");
            }
          });
    },
  }
}
</script>

<style scoped>

</style>