
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
      let data = [false, false];
      if (this.stockValue) {
        let ma12 = this.getMa12(this.stockValue);
        let ma26 = this.getMa26(this.stockValue);
        // 取得DIF
        let dif = this.getDif(ma12,ma26);
        // 取得MACD
        let macd = this.getDif9(dif);
        // 判斷
        let response = [];
        for (let i = 0; i < dif.length; i++) {
          let value = dif[i] - macd[i];
          response.push(value);
        }

        console.log("dif", dif);
        console.log("macd", macd);
        console.log("相差", response);

        if (
          (response[0] < 0.01 && response[0] > -0.01) ||
          (response[1] < 0.01 && response[1] > -0.01) ||
          (response[2] < 0.01 && response[2] > -0.01)
        ) {
          data[0] = true;
        }

        if (
          (dif[0] > dif[1] &&
            dif[1] > dif[2] &&
            dif[0] > 0 &&
            macd[0] > 0 &&
            ((dif[0] - macd[0] < 0.01 && dif[0] - macd[0] > -0.01) ||
              (dif[1] - macd[1] < 0.01 && dif[1] - macd[1] > -0.01))) ||
          (dif[0] > dif[1] &&
            dif[1] > dif[2] &&
            dif[0] < 0 &&
            macd[0] < 0 &&
            ((dif[0] + macd[0] < 0.01 && dif[0] + macd[0] > -0.01) ||
              (dif[1] + macd[1] < 0.01 && dif[1] + macd[1] > -0.01)))
        ) {
          data[1] = true;
        }
      }
      return data;
    }
  },
  methods: {
    getDI(value) {
      let arr = value.map(element => {
        return (element.h + element.l + 2 * element.c) / 4;
      });
      return arr;
    },
    getMa12(value) {
      let DI = this.getDI(value);

      let firstEMA = (DI[0]+DI[1]+DI[2]+DI[3]+DI[4]+DI[5]+DI[6]+DI[7]+DI[8]+DI[9]+DI[10]+DI[11]) / 12
      let arr = [firstEMA];
      for (let i = 0; i < DI.length-11; i++) {
        const element = (arr[i]*10+DI[i+11]*2)/12;
        arr.push(element);
      }
      console.log("ma12", arr);
      return arr; // ma12值
    },
    getMa26(value) {
      let DI = this.getDI(value);
      let firstEMA = (DI[0]+DI[1]+DI[2]+DI[3]+DI[4]+DI[5]+DI[6]+DI[7]+DI[8]+DI[9]+DI[10]+DI[11]+DI[12]+DI[13]+DI[14]+DI[15]+DI[16]+DI[17]+DI[18]+DI[19]+DI[20]+DI[21]+DI[22]+DI[23]+DI[24]+DI[25]) / 26
      let arr = [firstEMA];
      for (let i = 0; i < DI.length-25; i++) {
        const element = (arr[i]*24+DI[i+25]*2)/26;
        arr.push(element);
      }
      console.log("ma26", arr);
      return arr; // ma26值
    },
    getDif(ma12,ma26){
      let arr = []
      let number12 = ma12.length-1;
      let number26 = ma26.length-1;
      for (let i = 0; i < ma26.length; i++) {
        let element = ma12[number12-i]-ma26[number26-i];
        arr.push(element);
      }
      return arr;
    },
    getDif9(value) {
      let arr = [];
      for (let i = 0; i < value.length-8; i++) {
        let element =
          (value[i] +
            value[i + 1] +
            value[i + 2] +
            value[i + 3] +
            value[i + 4] +
            value[i + 5] +
            value[i + 6] +
            value[i + 7] +
            value[i + 8]) /
          9;
        arr.push(element);
      }
      return arr; // macd值
    }
  },
  watch: {}
};
</script>
