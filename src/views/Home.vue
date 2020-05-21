<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
    <table>
      <tr>
        <th v-for="item in flied" v-bind:key="item">{{item}}</th>
      </tr>
      <tr v-for="item in data" v-bind:key="item">
        <td>{{item[0]}}</td>
        <td>{{item[1]}}</td>
        <td>{{item[2]}}</td>
        <td>{{item[3]}}</td>
        <td>{{item[4]}}</td>
        <td>{{item[5]}}</td>
        <td>{{item[6]}}</td>
        <td>{{item[7]}}</td>
        <td>{{item[8]}}</td>
        <td>{{item[9]}}</td>
        <td>{{item[10]}}</td>
        <td>{{item[11]}}</td>
        <td>{{item[12]}}</td>
        <td>{{item[13]}}</td>
        <td>{{item[14]}}</td>
        <td>{{item[15]}}</td>
        <td>{{item[16]}}</td>
        <td>{{item[17]}}</td>
        <td>{{item[18]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  computed:{
    data:{
      get(){ return JSON.parse(this.$store.state.data); },
    },
    flied:{
      get(){ return this.$store.state.flied; },
    },
  },
  methods: {
  }
}
</script>
