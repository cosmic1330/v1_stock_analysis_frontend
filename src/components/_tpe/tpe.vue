<template src="./tpe.html"></template>

<script>
// @ is an alias to /src
import "./tpe.scss";

export default {
    name: "Tpe",
    mounted: function () {
        this.getTPEData();
    },
    data() {
        return {
            TPEData: [],
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
            // 取得收盤價差超過1%的時間點
            let list = [];
            for (let i = 0; i < 30; i++) {
                const element = ((this.TPECloseData[i] - this.TPECloseData[i - 1]) / this.TPECloseData[i]) * 100;
                if (element < -1) {
                    list.push(i);
                }
            }
            // 取得最高價的時間點
            let day = this.TPEHeightData.indexOf(`${this.MaxHeightPrice}`);
            // 檢查大跌的時間點是否發生在最高價後五天
            let in5day = false;
            list.forEach(element => {
                if (element < day + 5 && element > day) {
                    in5day = true;
                }
            });

            let value = ((this.MaxHeightPrice - this.MinLowPrice) / this.MaxHeightPrice) * 100; // 最高最低差
            // 分析： 最高最低價差 > 8% 且沒有發生在最高價5天內，回傳 false;
            if (value > 8 && !in5day) return 0;
            else return 1;
        },
        // 成交量狀態
        DealStatus() {
            // 30天平均成交量
            const average = this.TPEDealData.reduce((acc, val) => parseInt(acc) + parseInt(val), 0) / 30;
            // 前15天平均成交量
            let front_15_average =
                this.TPEDealData.filter((item, index) => {
                    if (index < 15) {
                        return item;
                    }
                }).reduce((acc, val) => parseInt(acc) + parseInt(val), 0) / 15;
            // 後15天平均成交量
            let end_15_average =
                this.TPEDealData.filter((item, index) => {
                    if (14 < index && index < 30) {
                        return item;
                    }
                }).reduce((acc, val) => parseInt(acc) + parseInt(val), 0) / 15;
            // 分析：後15日平均成交量 > 前15日平均成交量 , 近五日成交量大於30日平均成交量
            if (
                this.TPEDealData[29] > average &&
                this.TPEDealData[28] > average &&
                this.TPEDealData[27] > average &&
                this.TPEDealData[26] > average &&
                this.TPEDealData[25] > average &&
                end_15_average > front_15_average
            ) {
                return [
                    1,
                    this.TPEDealData[25],
                    this.TPEDealData[26],
                    this.TPEDealData[27],
                    this.TPEDealData[28],
                    this.TPEDealData[29],
                ];
            } else {
                return [
                    0,
                    this.TPEDealData[25],
                    this.TPEDealData[26],
                    this.TPEDealData[27],
                    this.TPEDealData[28],
                    this.TPEDealData[29],
                ];
            }
        },
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
    },
    watch: {},
};
</script>
