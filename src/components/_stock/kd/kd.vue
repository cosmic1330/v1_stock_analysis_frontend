<template src="./kd.html"></template>

<script>
// @ is an alias to /src
import "./kd.scss";

export default {
  name: "Kd",
  props: ["stockValue"],
  mounted: function () {},
  data() {
    return {};
  },
  components: {},
  computed: {
    kd: function () {
      let response = false;
      if (this.stockValue) {
        // console.log("kd");
        let value = JSON.stringify(this.stockValue);
        value = JSON.parse(value);
        let data = this.getKD(value);

        // 判斷
        // 1. 黃金交叉
        // if (
        //   data[0][0] > [data[1][0]] &&
        //   (data[0][1] < data[1][1])
        // ) {
        //   response = true;
        // }

        // 2. 價格高於dif
        let today = value[value.length - 1];
        let yesterday = value[value.length - 1];
        if (today.c < data[0][0] && yesterday > data[0][1]) {
          response = true;
        }
      }
      return response;
    },
  },
  methods: {
    getKD(value) {
      let beforeK = this.firstK(value);
      let beforeD = (2 / 3) * 50 + (1 / 3) * beforeK;
      let responseK = [beforeK];
      let responseD = [beforeD];
      for (let i = 9; i < value.length; i++) {
        let max = this.filterMax([
          value[i].h,
          value[i - 1].h,
          value[i - 2].h,
          value[i - 3].h,
          value[i - 4].h,
          value[i - 5].h,
          value[i - 6].h,
          value[i - 7].h,
          value[i - 8].h,
        ]);
        let min = this.filterMin([
          value[i].l,
          value[i - 1].l,
          value[i - 2].l,
          value[i - 3].l,
          value[i - 4].l,
          value[i - 5].l,
          value[i - 6].l,
          value[i - 7].l,
          value[i - 8].l,
        ]);
        let RSV = ((value[i].c - min) / (max - min)) * 100;
        let K = (2 / 3) * beforeK + (1 / 3) * RSV;
        let D = (2 / 3) * beforeD + (1 / 3) * K;
        beforeK = K;
        beforeD = D;
        responseK.push(K);
        responseD.push(D);
      }
      return [responseK.reverse(), responseD.reverse()];
    },
    filterMax(arr) {
      let max = 0;
      for (let e = 0; e < arr.length; e++) {
        if (arr[e] > max) {
          max = arr[e];
        }
      }
      return max;
    },
    filterMin(arr) {
      let min = arr[0];
      for (let e = 1; e < arr.length; e++) {
        if (arr[e] < min) {
          min = arr[e];
        }
      }
      return min;
    },
    firstK(value) {
      let i = 8;
      let max = this.filterMax([
        value[i].c,
        value[i - 1].c,
        value[i - 2].c,
        value[i - 3].c,
        value[i - 4].c,
        value[i - 5].c,
        value[i - 6].c,
        value[i - 7].c,
        value[i - 8].c,
      ]);
      let min = this.filterMin([
        value[i].c,
        value[i - 1].c,
        value[i - 2].c,
        value[i - 3].c,
        value[i - 4].c,
        value[i - 5].c,
        value[i - 6].c,
        value[i - 7].c,
        value[i - 8].c,
      ]);
      let RSV = ((value[i].c - min) / (max - min)) * 100;
      let K = (1 / 3) * RSV + (2 / 3) * 50;
      return K;
    },
  },
  watch: {},
};
</script>
