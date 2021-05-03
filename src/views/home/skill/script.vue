<template>
    <div id="skill">
        <!-- Definite table -->
        <article class="area1">
            <h2>確切的股票 (邁向上漲趨勢)</h2>
            <el-table :data="definite" style="width: 100%">
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column label="股票代號" width="100">
                    <template slot-scope="scope">
                        <p>
                            <a :href="filterPchomeUrl(scope.row.code)" target="_blank">{{ scope.row.code }}</a>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="名稱" width="80">
                    <template slot-scope="scope">
                        <p>
                            <a :href="filterYahooUrl(scope.row.code)" target="_blank">{{ scope.row.name }}</a>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="close_price" label="收盤價" width="100"> </el-table-column>
                <el-table-column label="交易指標" width="130">
                    <template slot-scope="scope">
                        <p>交易量:{{ scope.row.volume }}</p>
                        <p>平均交易量:{{ volume[scope.row.code] }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="三關價" width="100">
                    <template slot-scope="scope">
                        <p>上關: {{ customsPrices(scope.row, "UP") }}</p>
                        <p>中關: {{ customsPrices(scope.row, "Mid") }}</p>
                        <p>下關: {{ customsPrices(scope.row, "Down") }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="RSI" width="120">
                    <template slot-scope="scope">
                        <p>RSI6: {{ scope.row.rsi6 }}</p>
                        <p>RSI12: {{ scope.row.rsi12 }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="BIAS5" label="乖離率" width="100"> </el-table-column>
            </el-table>
        </article>

        <article class="area1">
            <h2>上漲訊號股</h2>
            <el-table :data="bottom" style="width: 100%">
                <el-table-column label="股票代號" width="100">
                    <template slot-scope="scope">
                        <p>
                            <a :href="filterPchomeUrl(scope.row.code)" target="_blank">{{ scope.row.code }}</a>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="名稱" width="100">
                    <template slot-scope="scope">
                        <p>
                            <a :href="filterYahooUrl(scope.row.code)" target="_blank">{{ scope.row.name }}</a>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="交易指標" width="150">
                    <template slot-scope="scope">
                        <p>交易量:{{ scope.row.volume }}</p>
                        <p>平均交易量:{{ volume[scope.row.code] }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="上漲訊息" width="150">
                    <template slot-scope="scope">
                        <p>{{ scope.row.msg[0] }}</p>
                        <p>{{ scope.row.msg[1] }}</p>
                        <p>{{ scope.row.msg[2] }}</p>
                        <p>{{ scope.row.msg[3] }}</p>
                        <p>{{ scope.row.msg[4] }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="close_price" label="收盤價" width="100"> </el-table-column>
                <el-table-column label="三關價" width="100">
                    <template slot-scope="scope">
                        <p>上關: {{ customsPrices(scope.row, "UP") }}</p>
                        <p>中關: {{ customsPrices(scope.row, "Mid") }}</p>
                        <p>下關: {{ customsPrices(scope.row, "Down") }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="BIAS5" label="乖離率" width="100"> </el-table-column>
            </el-table>
        </article>

        <article class="area1">
            <h2>追蹤的股票</h2>
            <el-table :data="mylove" style="width: 100%">
                <el-table-column label="股票代號" width="100">
                    <template slot-scope="scope">
                        <p>
                            <a :href="filterPchomeUrl(scope.row.code)" target="_blank">{{ scope.row.code }}</a>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="名稱" width="100">
                    <template slot-scope="scope">
                        <p>
                            <a :href="filterYahooUrl(scope.row.code)" target="_blank">{{ scope.row.name }}</a>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="volume" label="量" width="100"> </el-table-column>
                <el-table-column label="明日三關價" width="100">
                    <template slot-scope="scope">
                        <p>上關: {{ customsPrices(scope.row, "UP") }}</p>
                        <p>中關: {{ customsPrices(scope.row, "Mid") }}</p>
                        <p>下關: {{ customsPrices(scope.row, "Down") }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="今日價" width="120">
                    <template slot-scope="scope">
                        <p>開盤價: {{ scope.row.open_price }}</p>
                        <p>最高價: {{ scope.row.hight_price }}</p>
                        <p>收盤價: {{ scope.row.close_price }}</p>
                        <p>最低價: {{ scope.row.low_price }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="customsPrices" label="昨日三關價狀態" width="250"> </el-table-column>
            </el-table>
        </article>
    </div>
</template>

<script>
import "./style.scss";
import { Get_Stock_from_DB } from "../../../api/api.js";
import { segmentsIntr, customsPrices } from "./utils";
export default {
    name: "Corporations",
    mounted: function () {
        this.getStockData();
    },
    data: () => ({
        customsPrices: customsPrices,
    }),
    computed: {
        volume() {
            return this.$store.state.volume;
        },
        definite() {
            let data = this.$store.state.stock;
            let arr = [];
            Object.keys(data).forEach(element => {
                if (
                    // RSI塞選
                    data[element][1]['rsi12'] > 50 &&
                    data[element][1]['rsi12'] < 70 &&
                    data[element][0]["rsi6"] < data[element][0]["rsi12"] &&
                    data[element][2]["rsi6"] > data[element][2]["rsi12"] &&
                    // KD 塞選
                    data[element][0]["K9"] < data[element][0]["D9"] &&
                    data[element][2]["K9"] > data[element][2]["D9"] &&
                    data[element][2]["J"] > 5 &&
                    data[element][2]["J"] < 95 &&
                    // MACD塞選
                    data[element][2]["DIF"] > 0 &&
                    data[element][2]["MACD"] > 0 &&
                    data[element][2]["OSC"] > -0.03 &&
                    // 價量
                    data[element][2]["volume"] > 1000 &&
                    data[element][2]["volume"] > this.volume[element] &&
                    // 黃金交叉大於50
                    (
                        // K線交叉點
                        segmentsIntr(
                            {x:1,y:data[element][1]["K9"]},
                            {x:2,y:data[element][1]["D9"]},
                            {x:1,y:data[element][2]["K9"]},
                            {x:2,y:data[element][2]["D9"]}
                        ).y>50 ||
                        segmentsIntr(
                            {x:0,y:data[element][0]["K9"]},
                            {x:1,y:data[element][0]["D9"]},
                            {x:0,y:data[element][1]["K9"]},
                            {x:1,y:data[element][1]["D9"]}
                        ).y>50 ||
                    // RSI交叉點
                        segmentsIntr(
                            {x:1,y:data[element][1]["rsi6"]},
                            {x:2,y:data[element][1]["rsi12"]},
                            {x:1,y:data[element][2]["rsi6"]},
                            {x:2,y:data[element][2]["rsi12"]}
                        ).y>50 ||
                        segmentsIntr(
                            {x:0,y:data[element][0]["rsi6"]},
                            {x:1,y:data[element][0]["rsi12"]},
                            {x:0,y:data[element][1]["rsi6"]},
                            {x:1,y:data[element][1]["rsi12"]}
                        ).y>50
                    )
                ) {
                    arr.push(data[element][2]);
                }
            });
            
            return arr;
        },
        mylove() {
            let data = this.$store.state.stock;
            let arr = [];
            Object.keys(data).forEach(element => {
                // 指定股票
                if (
                    data[element][0]["stock_code"] === "2038"||
                    data[element][0]["stock_code"] === "2330" ||
                    data[element][0]["stock_code"] === "2342"
                ) {
                    let yesterdayUp = customsPrices(data[element][1], "UP");
                    let yesterdayMid = customsPrices(data[element][1], "Mid");
                    let yesterdayDown = customsPrices(data[element][1], "Down");
                    if(data[element][2]['open_price']>yesterdayUp){
                        data[element][2]['customsPrices'] = '今日突破上關，注意是否過昨日高，無則出場。'
                    }else if(data[element][2]['open_price']>yesterdayMid){
                        data[element][2]['customsPrices'] = '今日高於中關，觀察是否過 "昨日高"，則有機會再向上推升至上關價。'
                    }else if(data[element][2]['open_price']>yesterdayDown){
                        data[element][2]['customsPrices'] = '今日低於中關，觀察是否過 "昨日低"，則有機會再向下砍殺至下關價。'
                    }else{
                        data[element][2]['customsPrices'] = '今日突破下關，注意是否過昨日低，無則進場。'
                    }
                    arr.push(data[element][2]);
                }
            });
            return arr;
        },
        bottom() {
            let data = this.$store.state.stock;
            let arr = [];
            Object.keys(data).forEach(element => {
                let msg = [];

                // 黃金交叉期間
                if (
                    data[element][2]["volume"] > 1000 &&
                    data[element][2]["volume"] > this.volume[element] &&
                    data[element][0]["rsi6"] < data[element][0]["rsi12"] &&
                    data[element][2]["rsi6"] > data[element][2]["rsi12"] &&
                    (
                        // K線交叉點
                        segmentsIntr(
                            {x:0,y:data[element][0]["K9"]},
                            {x:1,y:data[element][0]["D9"]},
                            {x:0,y:data[element][1]["K9"]},
                            {x:1,y:data[element][1]["D9"]}
                        ).y>50 ||
                    // RSI交叉點
                        segmentsIntr(
                            {x:0,y:data[element][0]["rsi6"]},
                            {x:1,y:data[element][0]["rsi12"]},
                            {x:0,y:data[element][1]["rsi6"]},
                            {x:1,y:data[element][1]["rsi12"]}
                        ).y>50
                    )
                ) {
                    msg.push("黃金交叉期間");
                }

                // 吊人線
                if (
                    data[element][2]["volume"] > 1000 &&
                    data[element][2]["low_price"] < data[element][1]["low_price"] &&
                    ((parseInt(data[element][2]["close_price"]) - parseInt(data[element][2]["open_price"])) /
                        parseInt(data[element][2]["open_price"])) *
                        3 <
                        (parseInt(data[element][2]["open_price"]) - parseInt(data[element][2]["low_price"])) /
                            parseInt(data[element][2]["open_price"]) &&
                    parseInt(data[element][2]["close_price"]) >= parseInt(data[element][2]["open_price"]) &&
                    parseInt(data[element][2]["open_price"]) > parseInt(data[element][2]["low_price"]) &&
                    data[element][2]["close_price"] == data[element][2]["hight_price"]
                ) {
                    msg.push("吊人線");
                }

                // 下引十字線
                if (
                    data[element][2]["volume"] > 1000 &&
                    ((parseInt(data[element][2]["close_price"]) - parseInt(data[element][2]["open_price"])) /
                        parseInt(data[element][2]["open_price"])) *
                        3 <
                        (parseInt(data[element][2]["open_price"]) - parseInt(data[element][2]["low_price"])) /
                            parseInt(data[element][2]["open_price"]) &&
                    parseInt(data[element][2]["close_price"]) > parseInt(data[element][2]["open_price"]) &&
                    parseInt(data[element][2]["open_price"]) > parseInt(data[element][2]["low_price"])
                ) {
                    msg.push("下引十字線");
                }

                // 如果符合以上資格
                if (msg.length > 0) {
                    data[element][2]["msg"] = msg;
                    arr.push(data[element][2]);
                }
            });
            return arr;
        },
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
        filterPchomeUrl(code) {
            let str = "https://pchome.megatime.com.tw/stock/sto0/ock1/sid" + code + ".html";
            return str;
        },
        filterYahooUrl(code) {
            let str = "https://tw.stock.yahoo.com/q/ta?s=" + code;
            return str;
        },
    },
};
</script>
