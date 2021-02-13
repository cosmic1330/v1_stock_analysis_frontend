<template>
    <div id="PER">
        <el-tooltip class="item" effect="dark" :content="requirement" placement="bottom-start">
            <el-badge :value="stock.length" type="primary">
                <span id="filterResult">塞選結果</span>
            </el-badge>
        </el-tooltip>
        <article class="area1">
            <el-table :data="stock" style="width: 100%">
                <el-table-column prop="code" label="股票代號" width="100"> </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="PER" label="本益比"> </el-table-column>
                <el-table-column prop="yield" label="殖利率"> </el-table-column>
            </el-table>
        </article>
        <el-divider></el-divider>
    </div>
</template>

<script>
import "./style.scss";
import { Get_Per_Stock } from "../../api/api.js";
export default {
    name: "Per",
    mounted: function () {
        this.getFilterPerData();
    },
    data: () => ({
        requirement: "",
        stock: [],
    }),
    methods: {
        getFilterPerData() {
            Get_Per_Stock()
                .then(response => {
                    this.stock = response.data.data;
                    this.requirement = response.data.requirement;
                })
                .catch(error => console.log(error.response));
        },
    },
};
</script>
