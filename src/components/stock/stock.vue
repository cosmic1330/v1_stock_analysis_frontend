
<template src="./stock.html"></template>

<script>
// @ is an alias to /src
import "./stock.scss";
import Macd from "../../components/stock/macd/macd";

export default {
  name: "STOCK",
  props:['stockId'],
  mounted: function() {
    this.getData(this.stockId);
  },
  data() {
    return {
      value:null
    };
  },
  components: {Macd},
  computed: {},
  methods: {
    getData(data) {
      let url = `${process.env.VUE_APP_SECRET}/stock/getOneStockData/${data}`;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            let str = xhr.responseText.replace(
              "jQuery111306382856220483186_1591513211276(",
              ""
            );
            str =str.replace(
              ");",
              ""
            );

            this.value = JSON.parse(str).ta; // 每天股價含最高,最低,開收盤
          
          } else {
            console.log(data);
          }
        }
      };
      xhr.open("get", url, true);
      xhr.send(null);
    },
  },
  watch: {}
};
</script>
