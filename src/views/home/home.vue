
<template src="./home.html"></template>

<script>
// @ is an alias to /src
import "./home.scss";

export default {
  name: "Home",
  mounted: function() {
    this.getTPEData();
  },
  data() {
    return {
      TPEData: []
    };
  },
  components: {},
  computed: {
    //日期
    TPEDate() {
      let arr = [];
      for (let i = 0; i <= 29; i++) {
        const element = this.TPEData[i];
        arr.push(element);
      }
      return arr;
    },
    // 開盤價
    TPEOpenData() {
      let arr = [];
      for (let i = 30; i <= 59; i++) {
        const element = this.TPEData[i];
        arr.push(element);
      }
      return arr;
    },
    // 最高價
    TPEHeightData() {
      let arr = [];
      for (let i = 60; i <= 89; i++) {
        const element = this.TPEData[i];
        arr.push(element);
      }
      return arr;
    },
    // 最低價
    TPELowData() {
      let arr = [];
      for (let i = 90; i <= 119; i++) {
        const element = this.TPEData[i];
        arr.push(element);
      }
      return arr;
    },
    // 收盤價
    TPECloseData() {
      let arr = [];
      for (let i = 120; i <= 149; i++) {
        const element = this.TPEData[i];
        arr.push(element);
      }
      return arr;
    },
    // 成交量
    TPEDealData() {
      let arr = [];
      for (let i = 180; i <= 209; i++) {
        const element = this.TPEData[i];
        arr.push(element);
      }
      return arr;
    },
    // 30天中最高價
    MaxHeightPrice() {
      return Math.max(...this.TPEHeightData);
    },
    // 30天中最低價
    MinLowPrice() {
      return Math.min(...this.TPELowData);
    },
    // 判斷 30天中有最高最低價相差8%-9%將有一波大跌
    Analysis() {
      let list = [];
      for (let i = 0; i < this.TPECloseData.length; i++) {
        const element = (this.TPECloseData[i]-this.TPECloseData[i-1])/this.TPECloseData[i]*100;
        if(element<-1){
          list.push(i);
        }
      }
      let day = this.TPEHeightData.indexOf(`${this.MaxHeightPrice}`);
      let in5day = false;
      list.forEach(element => {
        if(element<day+5){
          in5day = true;
        }
      });

      let value =
        ((this.MaxHeightPrice - this.MinLowPrice) / this.MaxHeightPrice) * 100; // 最高最低差
      if (value > 8 && !in5day) return "注意近期有下跌警告";
      return "已通過大盤下跌警告";
    },
    // 成交量狀態
    DealStatus() {
      const average =
        this.TPEDealData.reduce(
          (acc, val) => parseInt(acc) + parseInt(val),
          0
        ) / this.TPEDealData.length;
        console.log(average)
      if (
        this.TPEDealData[29] > average &&
        this.TPEDealData[28] > average &&
        this.TPEDealData[27] > average &&
        this.TPEDealData[26] > average &&
        this.TPEDealData[25] > average
      ) {
        return '成交量縮';
      }
      return '成交量增';
    }
  },
  methods: {
    getTPEData() {
      let url = `${process.env.VUE_APP_SECRET}/stock/getTPEData`;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            let str = xhr.responseText;
            this.TPEData = str.split(",");
          } else {
            console.log(xhr.responseText);
          }
        }
      };
      xhr.open("get", url, true);
      xhr.send(null);
    },
    getData(data) {
      let url = `${process.env.VUE_APP_SECRET}/stock/getWebJSON2/${data}`;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
            let str = xhr.responseText.replace(
              "jQuery111306382856220483186_1591513211276(",
              ""
            );

            this.stock[data] = JSON.parse(str).ta; // 每天股價含最高,最低,開收盤
            this.getMa10(data, JSON.parse(str).ta);
          } else {
            console.log(data);
          }
        }
      };
      xhr.open("get", url, true);
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
            value[i - 9].c) /
          10;
        arr.push(element);
      }
      this.ma10[data] = arr; // ma10值
      this.getObedient(data, value, arr);
    },
    getObedient(data, value, ma10) {
      let aa =
        ((value[value.length - 1].c - ma10[ma10.length - 1]) /
          ma10[ma10.length - 1]) *
        100; //當天乖離率
      let bb =
        ((value[value.length - 4].c - ma10[ma10.length - 4]) /
          ma10[ma10.length - 4]) *
        100; //前天乖離率
      if (aa < 0 && bb < aa) {
        // console.log(
        //   `代碼:${data}`,
        //   `名稱:${this.name[data]}`,
        //   "乖離率:"+aa
        // );
        this.json.push({ code: data, name: this.name[data], value: aa });
      } else {
        // console.log(ma10[ma10.length - 1],value[value.length - 1].c)
        // console.log( `代碼:${data}`,
        //   `名稱:${this.name[data]}`,aa)
      }
      this.obedient[data] = aa;
    }
  },
  watch: {}
};
</script>
