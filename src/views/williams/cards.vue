<template>
    <div id="cards" v-if="!loading">
        <el-table :data="Object.keys(stocks)" style="width: 100%">
            <el-table-column type="index" label="編號" width="50"></el-table-column>
            <el-table-column type="data" label="股票代號" width="130">
                <template slot-scope="scope">
                    <a :href="filterPchomeUrl(scope.row)" target="_blank">{{ scope.row }}</a>
                </template>
            </el-table-column>
            <el-table-column type="data" label="名稱" width="130">
                <template slot-scope="scope">
                    <a :href="filterYahooUrl(scope.row)" target="_blank">{{ stocks[scope.row]['name'] }}</a>
                </template>
            </el-table-column>
            <el-table-column type="data" label="收盤價" width="130">
                <template slot-scope="scope">
                    {{ stocks[scope.row]['c'] }}
                </template>
            </el-table-column>
            <el-table-column type="data" label="黃金分割率" width="130">
                <template slot-scope="scope">
                    <p>超強勢：{{ stocks[scope.row]['goldSection']['超強勢'] }}</p>
                    <p>強勢：{{ stocks[scope.row]['goldSection']['強勢'] }}</p>
                    <p>中度：{{ stocks[scope.row]['goldSection']['中度'] }}</p>
                    <p>弱勢：{{ stocks[scope.row]['goldSection']['弱勢'] }}</p>
                    <p>超弱勢：{{ stocks[scope.row]['goldSection']['超弱勢'] }}</p>
                </template>
            </el-table-column>
            <el-table-column label="三關價" width="100">
                <template slot-scope="scope">
                    <p>上關: {{ customsPrices(stocks[scope.row], "UP") }}</p>
                    <p>中關: {{ customsPrices(stocks[scope.row], "Mid") }}</p>
                    <p>下關: {{ customsPrices(stocks[scope.row], "Down") }}</p>
                </template>
            </el-table-column>
            <el-table-column label="主力動向">
                <template slot-scope="scope">
                    <p>
                        <a :href="filterMainTrendUrl(scope.row)" target="_blank">前往</a>
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="大戶籌碼">
                <template slot-scope="scope">
                    <p>
                        <a :href="filterMajorInvestorsUrl(scope.row)" target="_blank">前往</a>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        
    </div>
</template>

<style lang="scss">
</style>

<script>
import { Get_Williams_Stock  } from "../../api/api.js";
export default {
    name: "Cards",
    mounted: function () {
        this.getData();
    },
    props:['handleLoading','loading'],
    components: {},
    data() {
        return {
            stocks:null,
        };
    },
    computed: {},
    methods: {
        async getData() {
            try {
                let response = await Get_Williams_Stock();
                this.stocks = response.data;
                console.log(Object.keys(response.data));
                this.handleLoading();
            } catch (error) {
                console.log(error);
            }
        },
        filterMainTrendUrl(code) {
            let str = `https://www.wantgoo.com/stock/${code}/major-investors/main-trend#main-trend`;
            return str;
        },
        filterMajorInvestorsUrl(code){
            let str = `https://www.wantgoo.com/stock/${code}/major-investors/concentration`;
            return str;
        },
        filterPchomeUrl(code) {
            let str = "https://pchome.megatime.com.tw/stock/sto0/ock1/sid" + code + ".html";
            return str;
        },
        filterYahooUrl(code) {
            let str = "https://tw.stock.yahoo.com/q/ta?s=" + code;
            return str;
        },
        customsPrices(data, type) {
            let response = null;
            switch (type) {
                case "UP":
                    response =
                        parseInt(data["l"]) +
                        (parseInt(data["h"]) - parseInt(data["l"])) * 1.382;
                    break;
                case "Mid":
                    response = (parseInt(data["h"]) + parseInt(data["l"])) * 0.5;
                    break;
                case "Down":
                    response =
                        parseInt(data["h"]) -
                        (parseInt(data["h"]) - parseInt(data["l"])) * 1.382;
                    break;
                default:
                    break;
            }
            return Math.round(response * 100) / 100;
        },
    },
};
</script>
