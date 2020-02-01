<template>
  <div class="home">
    <h1>home</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  created() {
    this.axios.post("/test").then(response => {
      console.log(response);
    });
  }
};
</script>
