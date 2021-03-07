<template>
    <div id="chart">
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>
import "./style.scss";
import { Get_One_Month_Of_Stock, } from "../../../api/api.js";
export default {
    name: "Chart",
    mounted: function () {
        this.getData();
    },
    data: () => ({
        chartOptions: {
            chart: { type: "line" },
            title: { text: "斐波納契樞軸點" },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: { text: "股價" }
            },
            series: [{
                    name: "收盤價",
                    data: [], // close price
                },
                {
                    name: "P",
                    data: [] // 壓力1
                },
                {
                    name: "R1",
                    data: [] // 壓力1
                },
                {
                    name: "R2",
                    data: [] // 壓力2
                },
                {
                    name: "R3",
                    data: [] // 壓力3
                },
                {
                    name: "S1",
                    data: [] // 支撐1
                },
                {
                    name: "S2",
                    data: [] // 支撐2
                },
                {
                    name: "S3",
                    data: [] // 支撐3
                }
            ]
        }
    }),
    computed: {
    },
    methods: {
        getData(){
            Get_One_Month_Of_Stock(3380)
                .then(response => {
                    let close_price = response.data.map(stock=>{return parseInt(stock.low_price);});
                    let P = response.data.map(stock=>{return this.customsPrices(stock,"P");});
                    let R1 = response.data.map(stock=>{return this.customsPrices(stock,"R1");});
                    let R2 = response.data.map(stock=>{return this.customsPrices(stock,"R2");});
                    let R3 = response.data.map(stock=>{return this.customsPrices(stock,"R3");});
                    let S1 = response.data.map(stock=>{return this.customsPrices(stock,"S1");});
                    let S2 = response.data.map(stock=>{return this.customsPrices(stock,"S2");});
                    let S3 = response.data.map(stock=>{return this.customsPrices(stock,"S3");});
                    let date = response.data.map(stock=>{return stock.date;});
                    this.chartOptions.series[0].data =  close_price;
                    this.chartOptions.series[1].data =  P;
                    this.chartOptions.series[2].data =  R1;
                    this.chartOptions.series[3].data =  R2;
                    this.chartOptions.series[4].data =  R3;
                    this.chartOptions.series[5].data =  S1;
                    this.chartOptions.series[6].data =  S2;
                    this.chartOptions.series[7].data =  S3;
                    this.chartOptions.xAxis.categories =  date;
                })
                .catch(error => console.log(error.response));
        },
        // 取得費波納契數值
        customsPrices(data,type){
            let response = null;
            let P = (parseInt(data['low_price']) + parseInt(data['hight_price']) + parseInt(data['close_price'])) / 3;
            switch (type) {
                case 'P':
                    response = P;
                    break;
                case 'R1':
                    response = P + (parseInt(data['hight_price']) - parseInt(data['low_price'])) * 0.382;
                    break;
                case 'R2':
                    response = P + (parseInt(data['hight_price']) - parseInt(data['low_price'])) * 0.618;
                    break;
                case 'R3':
                    response = P + (parseInt(data['hight_price']) - parseInt(data['low_price'])) * 1;
                    break;
                case 'S1':
                    response = P - (parseInt(data['hight_price']) - parseInt(data['low_price'])) * 0.382;
                    break;
                case 'S2':
                    response = P - (parseInt(data['hight_price']) - parseInt(data['low_price'])) * 0.618;
                    break;
                case 'S3':
                    response = P - (parseInt(data['hight_price']) - parseInt(data['low_price'])) * 1;
                    break;
                default:
                    break;
            }
            return Math.round(response * 100) / 100;
        },
    },
};
</script>
