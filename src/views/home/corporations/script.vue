<template>
    <div id="corporations">
        <el-tooltip effect="dark" :content="requirement" placement="bottom-start">
            <el-badge :value="trust.length + foreign.length" type="primary">
                <span id="filterResult">塞選結果</span>
            </el-badge>
        </el-tooltip>
        <!-- 投信table -->
        <article class="area1">
            <h2>投信買超股票</h2>
            <el-table :data="trust" style="width: 100%">
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
                <el-table-column prop="Ttoday" label="投信今日買超"> </el-table-column>
                <el-table-column prop="Tyesterday" label="投信昨日買超"> </el-table-column>
                <el-table-column prop="Ftoday" label="外資今日買超"> </el-table-column>
                <el-table-column prop="Fyesterday" label="外資昨日買超"> </el-table-column>
            </el-table>
        </article>

        <!-- 外資table -->
        <article class="area1">
            <h2>外資買超股票</h2>
            <el-table :data="foreign" style="width: 100%">
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
                <el-table-column prop="Ftoday" label="外資今日買超"> </el-table-column>
                <el-table-column prop="Fyesterday" label="外資昨日買超"> </el-table-column>
                <el-table-column prop="FdayBeforeYesterday" label="外資前日買超"> </el-table-column>
                <el-table-column prop="Ttoday" label="投信今日買超"> </el-table-column>
                <el-table-column prop="Tyesterday" label="投信昨日買超"> </el-table-column>
            </el-table>
        </article>
        <el-divider></el-divider>
    </div>
</template>

<script>
import "./style.scss";
import { Get_Corporations_Stock } from "../../../api/api.js";
export default {
    name: "Corporations",
    mounted: function () {
        this.getFilterPerData();
    },
    data: () => ({
        requirement: "法人連續買超2日",
    }),
    computed: {
        trust() {
            return this.$store.state.trust;
        },
        foreign() {
            return this.$store.state.foreign;
        },
    },
    methods: {
        getFilterPerData() {
            Get_Corporations_Stock()
                .then(response => {
                    this.$store.commit("setForeign", response.data.foreign);
                    this.$store.commit("setTrust", response.data.trust);
                })
                .catch(error => console.log(error.response));
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
