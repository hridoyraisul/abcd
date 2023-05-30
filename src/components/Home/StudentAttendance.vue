<template>
  <NavBar/>
  <h1>{{formattedDate}}</h1>
  <div class="d-flex text-center " :class="`${spinner ? '':'d-none'}`">
    <div class="spinner-border" role="status">
    </div>
    <strong class="ms-1">Loading...</strong>
  </div>
  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Student Name</th>
      <th scope="col">Today's Attendance</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(student,index) in students" :key="student.id">
      <td>{{ (itemsPerPage * (currentPage - 1)) + (index+1) }}</td>
      <td>{{ student.name }}</td>
      <td>
        <div v-if="student.attendance_status === null">
          <button type="button" @click="studentAttend(student,1)" class="btn btn-sm btn-success">
            Present
          </button>
          <button type="button" @click="studentAttend(student,0)" class="btn btn-sm btn-danger">
            Absent
          </button>
        </div>
        <div v-else>
          <strong :class="`${student.attendance_status == true ? 'text-success' : 'text-danger'}`">
            {{student.attendance_status == true ? 'Present' : 'Absent'}}
          </strong>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <Pagination :totalItems="totalStudents" :itemsPerPage="itemsPerPage" @page-change="fetchStudents" ></Pagination>
</template>

<script>
import {formattedDate} from "@/helper.js";
import axios from "axios";
import Pagination from "@/components/pagination.vue";
import NavBar from "@/components/Layouts/NavBar.vue";

export default {
  name: "StudentAttendance",
  components: {
    Pagination,
    NavBar
  },
  data() {
    return {
      students: [],
      formattedDate: formattedDate(),
      student: {
        id: "",
        name: "",
        attendance_status: "",
      },
      spinner: false,
      currentPage: 1,
      itemsPerPage: 10,
      totalStudents: 0
    };
  },
  mounted() {
    this.fetchStudents(this.currentPage);
  },
  methods: {
    async fetchStudents(currentPage) {
      this.spinner = true;
      this.currentPage = currentPage;
      await axios.get(this.$apiBaseURL+'allStudents?page='+currentPage,{
        headers: {
          'Authorization': `Bearer ${this.$root.token}`
        }
      })
          .then(response => {
            this.students = response.data.data.data;
            this.totalStudents = response.data.data.total;
          })
          .catch(error => {
            console.log(error.response.data.message);
          });
      this.spinner = false;
    },
    studentAttend(student, status) {
      axios.post(this.$apiBaseURL+'createAttendance', {
        student_id: student.id,
        user_id: 53,
        status: status
      },{
        headers: {
          'Authorization': `Bearer ${this.$root.token}`
        }
      }).then(response => {
        this.$toast(response.data.message);
        this.fetchStudents(this.currentPage);
      }).catch(err => {
        this.$toast(err.response.data.message, 'error');
        this.fetchStudents(this.currentPage);
      });
    }
  }
}
</script>

<style scoped>
</style>