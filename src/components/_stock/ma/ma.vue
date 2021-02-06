<template src="./ma.html"></template>

<script>
// @ is an alias to /src
import './ma.scss';

export default {
  name: 'Ma',
  props: ['stockValue'],
  mounted: function () {},
  data() {
    return {};
  },
  components: {},
  computed: {
    ma_trading: function () {
      let response = [false, false];
      if (this.stockValue) {
        // console.log('ma')
        let value = JSON.stringify(this.stockValue);
        value = JSON.parse(value);
        let today = value[value.length - 1];
        let yesterday = value[value.length - 2];

        // let ma5 = this.getMa5(value);
        // ma5 = ma5.reverse();
        // let ma20 = this.getMa20(value);
        // ma20 = ma20.reverse();
        let tradingVolume = this.tradingVolume(value);
        // 判斷
        // 1. 今日交易量大於平均交易量和成交量大於1000張
        // 2. ma黃金交叉
        if (
          today.v > 1000 &&
          (today.v > tradingVolume || yesterday.v > tradingVolume)
        ) {
          response[0] = true;
        }
        // if (ma5[0] > ma20[0] && (ma5[1] < ma20[1] || ma5[2] < ma20[2])) {
        //   response[1] = true;
        // }
      }
      return response;
    },
  },
  methods: {
    getMa5(value) {
      let arr = [];
      for (let i = 4; i < value.length; i++) {
        let element =
          (value[i].c +
            value[i - 1].c +
            value[i - 2].c +
            value[i - 3].c +
            value[i - 4].c) /
          5;
        element = Math.round(element * 100) / 100;
        arr.push(element);
      }
      return arr; // ma5值
    },
    getMa20(value) {
      let arr = [];
      for (let i = 19; i < value.length; i++) {
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
            value[i - 19].c) /
          20;
        element = Math.round(element * 100) / 100;
        arr.push(element);
      }
      return arr; // ma20值
    },
    tradingVolume(value) {
      let aa = value.reverse();
      let arr = 0;
      for (let i = 1; i < 45; i++) {
        arr = arr + aa[i].v;
      }
      let response = arr / 45;
      // console.log(response);
      return response; // 交易量
    },
  },
  watch: {},
};
</script>
