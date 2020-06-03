
<template src="./home.html"></template>

<script>
// @ is an alias to /src
import './home.scss'
import Table from "@/components/table/index.vue";
// import KLine from "@/components/chart/k_line/index.vue";

export default {
  name: "Home",
  data(){
    return {
      searchValue:null,
    }
  },
  components: {
    Table,
    // KLine
  },
  computed: {
    data: {
      get() {
        return JSON.parse(this.$store.state.data);
      }
    },
    flied: {
      get() {
        return this.$store.state.flied;
      }
    }
  },
  methods: {},
  watch: {
    searchValue:function(){
      console.log(this.searchValue);
    }
  }
};
</script>
