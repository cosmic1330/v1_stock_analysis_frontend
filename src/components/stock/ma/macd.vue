
<template src="./macd.html"></template>

<script>
// @ is an alias to /src
import "./macd.scss";

export default {
  name: "Macd",
  props: ["stockValue"],
  mounted: function() {},
  data() {
    return {};
  },
  components: {},
  computed: {
    dif: function() {
      if (this.stockValue) {
        let ma12 = this.getMa12(this.stockValue);
        let ma26 = this.getMa26(this.stockValue);
        // 取得DIF
        let length12 = ma12.length - 1;
        let length26 = ma26.length - 1;
        let dif = [];
        for (let i = length26; i >= 0; i--) {
          let value = ma12[length12] - ma26[i];
          length12--;
          dif.push(value);
        }
        dif = dif.reverse();
        // 取得MACD
        let macd = this.getDif9(dif);
        // 判斷
        let macdlength = macd.length - 1;
        let diflength = dif.length - 1;
        let response = [];
        for (let i = macdlength; i >= 0; i--) {
          let value = dif[diflength] - macd[i];
          diflength--;
          response.push(value);
        }
        console.log('dif',dif);
        console.log('macd',macd);
        console.log('相差',response);
      }
      return "hi";
    }
  },
  methods: {
    getMa12(value) {
      let arr = [];
      for (let i = 11; i < value.length; i++) {
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
            value[i - 9].c +
            value[i - 10].c +
            value[i - 11].c) /
          12;
        arr.push(element);
      }
      return arr; // ma12值
    },
    getMa26(value) {
      let arr = [];
      for (let i = 25; i < value.length; i++) {
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
            value[i - 9].c +
            value[i - 10].c +
            value[i - 11].c +
            value[i - 12].c +
            value[i - 13].c +
            value[i - 14].c +
            value[i - 15].c +
            value[i - 16].c +
            value[i - 17].c +
            value[i - 18].c +
            value[i - 19].c +
            value[i - 20].c +
            value[i - 21].c +
            value[i - 22].c +
            value[i - 23].c +
            value[i - 24].c +
            value[i - 25].c) /
          26;
        arr.push(element);
      }
      return arr; // ma26值
    },
    getDif9(value){
      let arr = [];
      for (let i = 8; i < value.length; i++) {
        let element =
          (value[i] +
            value[i - 1] +
            value[i - 2] +
            value[i - 3] +
            value[i - 4] +
            value[i - 5] +
            value[i - 6] +
            value[i - 7] +
            value[i - 8] ) /
          9;
        arr.push(element);
      }
      return arr; // macd值
    }
  },
  watch: {}
};
</script>
