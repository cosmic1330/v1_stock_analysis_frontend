
<template src="./home.html"></template>

<script>
// @ is an alias to /src
import "./home.scss";
import Chart from "@/components/chart/index.vue";

export default {
  name: "Home",
  mounted: function() {
    this.list.forEach(element => {
      setTimeout(() => {
        this.getData(element);
      }, 3000);
    });
  },
  data() {
    return {
      stock: {},
      ma10: {},
      obedient: {},
      json:[],
    };
  },
  components: {
    Chart
  },
  computed: {
    list: {
      get() {
        return this.$store.getters.code;
      }
    },
    baseUrl: function() {
      return this.$store.state.baseUrl;
    },
    name: function() {
      return this.$store.state.list;
    }
  },
  methods: {
    getData(data) {
      let url = `${this.baseUrl}/api/getWebJSON2/${data}`;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            // console.log(xhr.responseText);
            let str = xhr.responseText
              .replace("jQuery111306382856220483186_1591513211276(", "")
              .replace(");", "");
            this.stock[data] = JSON.parse(str).ta; // 每天股價含最高,最低,開收盤
            this.getMa10(data, JSON.parse(str).ta);
          } else {
            console.log(xhr.status);
          }
        }
      };
      xhr.open("get", url, true);
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("_token")}`
      );
      xhr.send(null);
    },
    getMa10(data, value) {
      let arr = [];
      for (let i = 9; i < value.length; i++) {
        let element =
          (value[i].c +
            value[i - 1].c +
            value[i - 2].c +
            value[i - 3].c +
            value[i - 4].c +
            value[i - 5].c +
            value[i - 6].c +
            value[i - 7].c +
            value[i - 8].c +
            value[i - 9].c ) /
          10;
        arr.push(element);
      }
      this.ma10[data] = arr; // ma10值
      this.getObedient(data, value, arr);
    },
    getObedient(data, value, ma10) {
      let aa = (value[value.length - 1].c - ma10[ma10.length - 1]) / ma10[ma10.length - 1] * 100; //當天乖離率
      let bb = (value[value.length - 3].c - ma10[ma10.length - 3]) / ma10[ma10.length - 3] * 100; //前天乖離率
      if (aa < 0 && bb < aa) {
        console.log(
          `代碼:${data}`,
          `名稱:${this.name[data]}`,
          "乖離率:"+aa
        );
        this.json.push({code:data,name:this.name[data],value:aa})
      }else{
        console.log(ma10[ma10.length - 1],value[value.length - 1].c)
        console.log( `代碼:${data}`,
          `名稱:${this.name[data]}`,aa)
      }
      this.obedient[data] = aa;
    }
  },
  watch: {}
};
</script>
