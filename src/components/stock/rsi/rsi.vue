
<template src="./rsi.html"></template>

<script>
// @ is an alias to /src
import "./rsi.scss";

export default {
  name: "Rsi",
  props: ["stockValue"],
  mounted: function() {},
  data() {
    return {};
  },
  components: {},
  computed: {
    res: function() {
      let response = [false, false];
      if (this.stockValue) {
        console.log('rsi')
        let value = JSON.stringify(this.stockValue);
        value = JSON.parse(value).reverse();
        let r6 = this.rsi6(value);
        let r12 = this.rsi12(value);
        // 判斷
        if(r6[0]> r12[0] && (r6[1]< r12[1] || r6[2]< r12[2])){
          response[0] = true;
        }
        if(r6[0]<85){
          response[1] = true;
        }
      }
      return response;
    }
  },
  methods: {
    rsi6(value) {
      let response = [];
      for (let i = 0; i < value.length - 6; i++) {
        let rise = 0;
        let fall = 0;
        // 分配當天的漲跌值
        let arr = [
          Math.round((value[i].c - value[i + 1].c) * 100) / 100,
          Math.round((value[i + 1].c - value[i + 2].c) * 100) / 100,
          Math.round((value[i + 2].c - value[i + 3].c) * 100) / 100,
          Math.round((value[i + 3].c - value[i + 4].c) * 100) / 100,
          Math.round((value[i + 4].c - value[i + 5].c) * 100) / 100,
          Math.round((value[i + 5].c - value[i + 6].c) * 100) / 100
        ];
        arr.forEach(element => {
          if (element > 0) {
            rise = rise + element;
          } else {
            fall = fall + Math.abs(element);
          }
        });
        let RS = rise / fall ;
        let RSI6 = 100 - 100 / (1 + RS);
        response.push(RSI6);
      }
      return response; // 值
    },
    rsi12(value) {
      let response = [];
      for (let i = 0; i < value.length - 12; i++) {
        let rise = 0;
        let fall = 0;
        // 分配當天的漲跌值
        let arr = [
          Math.round((value[i].c - value[i + 1].c) * 100) / 100,
          Math.round((value[i + 1].c - value[i + 2].c) * 100) / 100,
          Math.round((value[i + 2].c - value[i + 3].c) * 100) / 100,
          Math.round((value[i + 3].c - value[i + 4].c) * 100) / 100,
          Math.round((value[i + 4].c - value[i + 5].c) * 100) / 100,
          Math.round((value[i + 5].c - value[i + 6].c) * 100) / 100,
          Math.round((value[i + 6].c - value[i + 7].c) * 100) / 100,
          Math.round((value[i + 7].c - value[i + 8].c) * 100) / 100,
          Math.round((value[i + 8].c - value[i + 9].c) * 100) / 100,
          Math.round((value[i + 9].c - value[i + 10].c) * 100) / 100,
          Math.round((value[i + 10].c - value[i + 11].c) * 100) / 100,
          Math.round((value[i + 11].c - value[i + 12].c) * 100) / 100
        ];
        arr.forEach(element => {
          if (element > 0) {
            rise = rise + element;
          } else {
            fall = fall + Math.abs(element);
          }
        });
        let UP = rise / 12;
        let DN = fall / 12;
        let RSI12 = (UP / (UP + DN)) * 100;
        response.push(RSI12);
      }
      return response; // 值
    }
  },
  watch: {}
};
</script>
