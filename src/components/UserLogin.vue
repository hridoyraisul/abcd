<template>
  <div class="container">
    <h1 class="text-center pt-3">User Login</h1>
    <div class="card card-body">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-info">Login</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "UserLogin"
}
</script>

<style scoped>

</style>