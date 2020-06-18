<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">選股</router-link>
      <router-link to="/about">買在最低點</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin-right: 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
    &:last-of-type {
      margin: 0;
    }
  }
}
</style>


<script>
export default {
  name: "App",
  mounted: function() {
  },
  computed: {
    baseUrl: function() {
      return this.$store.state.baseUrl;
    }
  },
  methods: {
    getToken() {
      if (!localStorage.getItem("_token")) {
        let data = `name=web&phone=0912345678`;
        let url = `${this.baseUrl}/Token/getToken`;
        this.$store.dispatch("login", { url, data });
      }
    }
  }
};
</script>
