<template>
    <div id="epsCards">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <!-- <el-card v-for="stock in alleps" :key="stock">
            <Card :stock="stock"/>
        </el-card> -->
    </div>
</template>

<style>
#epsCards{
    width: 80%;
    margin:auto;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
}
</style>

<script>
import { Get_Eps_Of_Stock } from "../../../api/api.js";
import Card from './card';
export default {
    name: "step1",
    mounted: function () {
        this.getEpsData();
    },
    components: {
        Card
    },
    props:['handleLoading'],
    data() {
        return {
            alleps:[]
        };
    },
    computed: {
        plus: function () {
            return''
        }
    },
    methods: {
        getEpsData() {
            Get_Eps_Of_Stock()
                .then(response => {
                    console.log(response.data);
                    this.alleps = response.data;
                    this.handleLoading();
                })
                .catch(error => console.log(error.response));
        },
    }
};
</script>
