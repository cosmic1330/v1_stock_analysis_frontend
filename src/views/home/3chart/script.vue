<template>
    <div id="chart">
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>
import "./style.scss";
import { Get_One_Month_Of_Stock } from "../../../api/api.js";
export default {
    name: "Chart",
    mounted: function () {
        this.getData();
    },
    data: () => ({
        stock: [],
        chartOptions: {
            chart: { type: "line" },
            title: { text: "三關價" },
            xAxis: {
                categories: [],
            },
            yAxis: {
                title: { text: "股價" },
            },
            series: [
                {
                    name: "收盤價",
                    data: [], // close price
                },
                {
                    name: "上關",
                    data: [], // up price
                },
                {
                    name: "中關",
                    data: [], // mid price
                },
                {
                    name: "下關",
                    data: [], // down price
                },
            ],
        },
    }),
    computed: {},
    methods: {
        getData() {
            Get_One_Month_Of_Stock(2062)
                .then(response => {
                    this.stock = response.data;
                    let open_price = response.data.map(stock => {
                        return parseInt(stock.open_price);
                    });
                    let UP = response.data.map(stock => {
                        return this.customsPrices(stock, "UP");
                    });
                    let Mid = response.data.map(stock => {
                        return this.customsPrices(stock, "Mid");
                    });
                    let Down = response.data.map(stock => {
                        return this.customsPrices(stock, "Down");
                    });
                    let date = response.data.map(stock => {
                        return stock.date;
                    });
                    this.chartOptions.series[0].data = open_price;
                    this.chartOptions.series[1].data = [UP[0], ...UP];
                    this.chartOptions.series[2].data = [Mid[0], ...Mid];
                    this.chartOptions.series[3].data = [Down[0], ...Down];
                    this.chartOptions.xAxis.categories = date;
                })
                .catch(error => console.log(error.response));
        },
        // 取得三關價
        customsPrices(data, type) {
            let response = null;
            switch (type) {
                case "UP":
                    response =
                        parseInt(data["low_price"]) +
                        (parseInt(data["hight_price"]) - parseInt(data["low_price"])) * 1.382;
                    break;
                case "Mid":
                    response = (parseInt(data["hight_price"]) + parseInt(data["low_price"])) * 0.5;
                    break;
                case "Down":
                    response =
                        parseInt(data["hight_price"]) -
                        (parseInt(data["hight_price"]) - parseInt(data["low_price"])) * 1.382;
                    break;
                default:
                    break;
            }
            return Math.round(response * 100) / 100;
        },
    },
};
</script>
