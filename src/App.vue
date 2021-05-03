<template>
    <div id="app">
        <Nav></Nav>
        <el-container>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
        <el-footer>
            <el-backtop></el-backtop>
        </el-footer>
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    min-height: 100vh;
}
</style>

<script>
import Nav from "./components/nav/script";
import { Get_Last_Date, Get_All_Stock_Code, Get_Volume_Avg_Of_Stock } from "./api/api.js";
export default {
    name: "App",
    mounted: function () {
        this.getData();
    },
    components: {
        Nav,
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        async getData() {
            try {
                let lastDate = await Get_Last_Date();
                let codesData = await Get_All_Stock_Code();
                let volume = await Get_Volume_Avg_Of_Stock();
                let codes = {};
                codesData.data.forEach(element => {
                    codes[element.code] = element.name;
                });
                this.$store.commit("setCodes", codes);
                this.$store.commit("setLastDate", lastDate.data.date);
                this.$store.commit("setVolume", volume.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
