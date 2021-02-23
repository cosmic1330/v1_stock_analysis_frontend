<template>
    <div id="corporations">
        <!-- Definite table -->
        <article class="area1">
            <h2>確切的股票 (邁向上漲趨勢)</h2>
            <el-table :data="definite" style="width: 100%">
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column label="股票代號" width="100">
                    <template slot-scope="scope">
                        <p><a :href="filterPchomeUrl(scope.row.code)" target="_blank">{{scope.row.code}}</a></p>
                    </template>
                </el-table-column>
                <el-table-column label="名稱" width="100">
                    <template slot-scope="scope">
                        <p><a :href="filterYahooUrl(scope.row.code)" target="_blank">{{scope.row.name}}</a></p>
                    </template>
                </el-table-column>
                <el-table-column prop="close_price" label="收盤價" width="100"> </el-table-column>
                <el-table-column prop="volume" label="量" width="100"> </el-table-column>
                <el-table-column label="三關價"  width="100">
                    <template slot-scope="scope">
                        <p>上關: {{ customsPrices(scope.row, 'UP') }}</p>
                        <p>中關: {{ customsPrices(scope.row, 'Mid') }}</p>
                        <p>下關: {{ customsPrices(scope.row, 'Down') }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="RSI"  width="120">
                    <template slot-scope="scope">
                        <p>RSI6: {{ scope.row.rsi6 }}</p>
                        <p>RSI12: {{ scope.row.rsi12 }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="BIAS5" label="乖離率" width="100"> </el-table-column>
            </el-table>
        </article>

        <article class="area1">
            <h2>谷底翻身 (上漲趨勢股)</h2>
            <el-table :data="bottom" style="width: 100%">
                <el-table-column label="股票代號" width="100">
                    <template slot-scope="scope">
                        <p><a :href="filterPchomeUrl(scope.row.code)" target="_blank">{{scope.row.code}}</a></p>
                    </template>
                </el-table-column>
                <el-table-column label="名稱" width="100">
                    <template slot-scope="scope">
                        <p><a :href="filterYahooUrl(scope.row.code)" target="_blank">{{scope.row.name}}</a></p>
                    </template>
                </el-table-column>
                <el-table-column prop="volume" label="量" width="100"> </el-table-column>
                <el-table-column label="上漲訊息" width="150">
                    <template slot-scope="scope">
                        <p>{{ scope.row.msg[0] }}</p>
                        <p>{{ scope.row.msg[1] }}</p>
                        <p>{{ scope.row.msg[2] }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="三關價" width="100">
                    <template slot-scope="scope">
                        <p>上關: {{ customsPrices(scope.row, 'UP') }}</p>
                        <p>中關: {{ customsPrices(scope.row, 'Mid') }}</p>
                        <p>下關: {{ customsPrices(scope.row, 'Down') }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="價" width="120">
                    <template slot-scope="scope">
                        <p>開盤價: {{ scope.row.open_price }}</p>
                        <p>最高價: {{ scope.row.hight_price }}</p>
                        <p>收盤價: {{ scope.row.close_price }}</p>
                        <p>最低價: {{ scope.row.low_price }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="BIAS5" label="乖離率" width="100"> </el-table-column>
            </el-table>
        </article>
    </div>
</template>

<script>
import "./style.scss";
import { Get_Stock_from_DB, } from "../../../api/api.js";
export default {
    name: "Corporations",
    mounted: function () {
        this.getStockData();
    },
    data: () => ({
        requirement: "法人連續買超2日",
    }),
    computed: {
        definite() {
            let data = this.$store.state.stock;
            let arr = [];
            Object.keys(data).forEach(element => {
                if(
                    // RSI塞選
                    data[element][0]['rsi6'] < data[element][0]['rsi12'] &&
                    data[element][2]['rsi6'] > data[element][2]['rsi12'] &&
                    data[element][1]['rsi12'] > 50 &&
                    data[element][1]['rsi12'] < 70 &&
                    // MACD塞選
                    data[element][2]['DIF'] > 0 &&
                    data[element][2]['MACD'] > 0 &&
                    data[element][2]['OSC'] > -0.03 &&
                    // KD 塞選
                    data[element][2]['K9'] > data[element][1]['K9'] &&
                    data[element][1]['K9'] > data[element][0]['K9'] &&
                    // data[element][0]['K9'] < data[element][0]['D9'] &&
                    // data[element][2]['K9'] > data[element][2]['D9'] &&
                    data[element][2]['K9']> 30 &&
                    data[element][2]['K9']< 70 &&
                    data[element][2]['D9']> 30 &&
                    data[element][2]['D9']< 70 &&
                    data[element][2]['J']> 5 &&
                    data[element][2]['J']< 95 &&
                    // 價量
                    data[element][2]['volume'] > 1000 &&
                    data[element][2]['close_price'] > data[element][2]['MA5']
                ){
                    arr.push(data[element][2])
                }
            });
            return arr;
        },
        reference(){
            let data = this.$store.state.stock;
            let arr = [];
            Object.keys(data).forEach(element => {
                let msg = [];
                // KD 黃金交叉
                if(
                    data[element][0]['K9'] < data[element][0]['D9'] &&
                    data[element][2]['K9'] > data[element][2]['D9']
                ){
                    msg.push('KD黃叉')
                }

                // MACD 轉正
                if(
                    data[element][2]['OSC'] > 0 &&
                    data[element][0]['OSC'] < 0
                ){
                    msg.push('MACD轉正')
                }

                // 價量
                if(
                    data[element][2]['volume'] > 1000 &&
                    data[element][0]['close_price'] < data[element][0]['MA5'] &&
                    data[element][2]['close_price'] > data[element][2]['MA5']
                ){
                        msg.push('站上MA5')
                }

                // 如果符合以上資格
                if(msg.length > 2){
                    data[element][2]['msg'] = msg;
                    arr.push(data[element][2])
                }
            });
            return arr;
        },
        bottom(){
            let data = this.$store.state.stock;
            let arr = [];
            Object.keys(data).forEach(element => {
                let msg = [];

                // KD 往上準備交叉
                if(
                    data[element][0]['K9'] < data[element][2]['K9'] &&
                    Math.abs(parseInt(data[element][2]['D9'])-parseInt(data[element][1]['D9'])) < Math.abs(parseInt(data[element][1]['D9'])-parseInt(data[element][0]['D9']))
                ){
                    msg.push('KD持續增加')
                }

                // 吊人線
                if(
                    data[element][2]['volume'] > 1000 &&
                    (parseInt(data[element][2]['close_price'])-parseInt(data[element][2]['open_price']))/parseInt(data[element][2]['open_price'])*2 < (parseInt(data[element][2]['open_price'])-parseInt(data[element][2]['low_price']))/parseInt(data[element][2]['open_price']) &&
                    parseInt(data[element][2]['close_price']) >= parseInt(data[element][2]['open_price']) &&
                    parseInt(data[element][2]['open_price']) > parseInt(data[element][2]['low_price']) &&
                    data[element][2]['close_price'] == data[element][2]['hight_price']
                ){
                        msg.push('吊人線')
                }

                // 下引十字線
                if(
                    data[element][2]['volume'] > 1000 &&
                    (parseInt(data[element][2]['close_price'])-parseInt(data[element][2]['open_price']))/parseInt(data[element][2]['open_price'])*2 < (parseInt(data[element][2]['open_price'])-parseInt(data[element][2]['low_price']))/parseInt(data[element][2]['open_price']) &&
                    parseInt(data[element][2]['close_price']) > parseInt(data[element][2]['open_price']) &&
                    parseInt(data[element][2]['open_price']) > parseInt(data[element][2]['low_price']) &&
                    data[element][2]['close_price'] == data[element][2]['open_price']
                ){
                        msg.push('下引十字線')
                }

                // 如果符合以上資格
                if(msg.length > 1){
                    data[element][2]['msg'] = msg;
                    arr.push(data[element][2])
                }
            });
            return arr;
        }
    },
    methods: {
        // 取得資料庫資料
        getStockData() {
            Get_Stock_from_DB()
                .then(response => {
                    this.$store.commit("setStock", response.data);
                })
                .catch(error => console.log(error.response));
        },
        // 取得三關價
        customsPrices(data,type){
            let response = null;
            switch (type) {
                case 'UP':
                    response = parseInt(data['low_price']) + (parseInt(data['hight_price'])-parseInt(data['low_price']))*1.382;
                    break;
                case 'Mid':
                    response = (parseInt(data['hight_price']) + parseInt(data['low_price']))*0.5;
                    break;
                case 'Down':
                    response = parseInt(data['hight_price']) - (parseInt(data['hight_price'])-parseInt(data['low_price']))*1.382;
                    break;
                default:
                    break;
            }
            return Math.round(response * 100) / 100;
        },
        filterPchomeUrl(code){
            let str = "https://pchome.megatime.com.tw/stock/sto0/ock1/sid"+code+".html";
            return str;
        },
        filterYahooUrl(code){
            let str = "https://tw.stock.yahoo.com/q/ta?s="+code;
            return str;
        }
    },
};
</script>
