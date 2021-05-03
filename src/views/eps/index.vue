<template>
    <div>
        <Loading v-if="loading"/>
        <div  v-if="!loading">
            <el-steps :active="active" finish-status="success">
                <el-step title="步骤 1"></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3"></el-step>
            </el-steps>
            <button v-on:click="next">下一步</button>
        </div>
        <Step1 :handle-loading="handleLoading" v-if="active==0"/>
    </div>
</template>

<style>
</style>

<script>
import Step1 from './step1';
import Loading from './loading';
export default {
    name: "Eps",
    mounted: function () {
    },
    components: {
        Step1,
        Loading
    },
    data() {
        return {
            loading:true,
            active: 0,
        };
    },
    methods: {
        handleLoading(){
            this.loading=false;
        },
        next() {
            if (this.active++ > 2) this.active = 0;
        },
    }
};
</script>
