<template>
  <div id="app">
    <Nav></Nav>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer>
      <el-backtop
        target=".page-component__scroll .el-scrollbar__wrap"
      ></el-backtop>
    </el-footer>
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
</style>

<script>
import Nav from "./components/nav/script";
export default {
  name: "App",
  mounted: function () {},
  components: {
    Nav,
  },
  computed: {},
  methods: {},
};
</script>
