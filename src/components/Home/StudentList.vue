<template>
  <NavBar/>
  <button type="button" @click="processStudentCreateForm" class="btn btn-sm btn-info">
    + New
  </button>
  <div class="d-flex text-center " :class="{'d-none': !spinner}">
    <div class="spinner-border" role="status">
    </div>
    <strong class="ms-1">Loading...</strong>
  </div>

  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Gender</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(student,index) in students" :key="student.id">
      <th scope="row">{{ (itemsPerPage * (currentPage - 1)) + (index+1) }}</th>
      <td>{{ student.name }}</td>
      <td>{{ student.email }}</td>
      <td>{{String(student.gender).toUpperCase()}}</td>
      <td>
        <button type="button" @click="processEdit(student)" class="btn btn-primary">
          Edit
        </button>
        <button @click="processDelete(student)" class="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
    </tbody>
  </table>
  <Pagination :totalItems="totalStudents" :itemsPerPage="itemsPerPage" @page-change="fetchStudents" ></Pagination>

  <!-- Modal start-->
  <BSModal :title="`${student.id ? 'Edit' : 'Create'} Student`" ref="studentModal" @formSubmit="studentFormSubmit">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" v-model="student.name" id="name">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" v-model="student.email" id="email">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Address</label>
      <textarea class="form-control" v-model="student.address" rows="3" id="address"></textarea>
    </div>
    <div class="mb-3">
      <label for="gender" class="form-label">Gender</label>
      <select class="form-control" v-model="student.gender">
        <option selected disabled >Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Others</option>
      </select>
    </div>
  </BSModal>
  <!--Modal end-->
</template>

<script>
import BSModal from "@/components/BSModal.vue";
import axios from "axios";
import Pagination from "@/components/pagination.vue";
import NavBar from "@/components/Layouts/NavBar.vue";
export default {
  name: "StudentList",
  components: {
    NavBar,
    BSModal,
    Pagination
  },
  data(){
    return {
      students: [],
      student: {
        name: "",
        email: "",
        address: "",
        gender: ""
      },
      spinner: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalStudents: 0
    }
  },
  mounted() {
    this.fetchStudents(this.currentPage);
  },
  methods: {
    async fetchStudents(currentPage){
      this.currentPage = currentPage;
      this.spinner = true;
      await axios.get(this.$apiBaseURL+'allStudents?page='+currentPage)
          .then(response => {
            this.students = response.data.data.data;
            this.totalStudents = response.data.data.total;
          })
          .catch(error => {
            console.log(error.response.data.message);
          });
      this.spinner = false;
    },
    processStudentCreateForm(){
      this.$refs.studentModal.modal('show');
    },
    studentFormSubmit(){
      if (Object.keys(this.student).some(key => this.student[key] === "")){
        this.$swal("Please fill all the fields!","error", "Validation Error!");
        return;
      }
      if (this.student.id){
        axios.put(this.$apiBaseURL+'updateStudent/'+this.student.id,this.student).then(response => {
          this.fetchStudents(this.currentPage);
          Object.keys(this.student).forEach(key => this.student[key] = "");
          this.$refs.studentModal.modal('hide');
          this.$swal(response.data.message,"success","Updated!");
        }).catch(error => {
          this.$swal(error.response.data.message,"error");
        });
      } else {
        axios.post(this.$apiBaseURL+'createStudent',this.student).then(response => {
          this.fetchStudents(this.currentPage);
          Object.keys(this.student).forEach(key => this.student[key] = "");
          this.$refs.studentModal.modal('hide');
          this.$swal(response.data.message);
        }).catch(error => {
          this.$swal(error.response.data.message,"error");
        });
      }
    },
    processEdit(student){
      this.student = {...student};
      this.$refs.studentModal.modal('show');
    },
    processDelete(student){
      this.$swal("After removing "+student.name+" will be lost","delete", "Want to remove this student?")
          .then((t) => {
            if (t.value === true) {
              axios.delete(this.$apiBaseURL + "deleteStudent/" + student.id).then(response => {
                this.$swal(response.data.message,"success",'Deleted!');
                this.fetchStudents(this.currentPage);
              }).catch(error => {
                this.$swal(error.response.data.message,"error");
              });
            } else {
              this.$swal("This student is safe now","error","Cancelled!");
            }
          });
    }
  }
}
</script>

<style scoped>

</style>