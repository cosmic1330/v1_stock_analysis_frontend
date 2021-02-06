<template>
  <div id="app">
    <Nav :db-date="date"></Nav>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer>
      <el-backtop></el-backtop>
    </el-footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  min-height: 100vh;
}
</style>

<script>
import Nav from './components/nav/script';
import { Get_Last_Date } from './api/api.js';
export default {
  name: 'App',
  mounted: function () {
    Get_Last_Date()
      .then(reponse => (this.date = reponse.data.date))
      .catch(error => console.log(error.response.data.message));
  },
  components: {
    Nav,
  },
  data() {
    return {
      date: '????-??-??',
    };
  },
  computed: {},
  methods: {},
};
</script>
