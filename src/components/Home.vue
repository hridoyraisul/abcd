<template>
  <div class="home-page">
    <NavBar :userInfo="userData" />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/Layouts/NavBar.vue";
export default {
  name: "HomePage",
  components: {
    NavBar
  },
  data() {
    return {
      userData: {
        id: 1,
        name: "John Doe",
        email: "jdfkjnsdkfjb@gmail.sfbv"
      }
    };
  },
  methods: {
    //
  },
}
</script>

<style scoped>

</style>