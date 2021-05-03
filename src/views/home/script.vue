<template src="./index.html"></template>

<script>
// @ is an alias to /src
import "./style.scss";
import PER from "./per/script";
import Corporations from "./corporations/script";
import Skill from "./skill/script";
import Chart3 from "./3chart/script";
import Stock from "../../utils/stockClass.js";

export default {
    name: "Home",
    mounted: function () {
        // this.getData();
        let a = new Stock();
        a.getter();
    },
    data() {
        return {
            activeName: "third",
        };
    },
    components: {
        PER,
        Corporations,
        Skill,
        Chart3,
    },
    computed: {},
    methods: {
        getData(data) {
            let url = `${process.env.VUE_APP_CORS}https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=2308&v=1&callback=jQuery111306382856220483186_1591513211276&_=1591513211278`;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200) {
                        let str = xhr.responseText.replace("jQuery111306382856220483186_1591513211276(", "");
                        str = str.replace(");", "");
                        str = JSON.parse(str);
                        console.log(str);
                    } else {
                        console.log(data);
                    }
                }
            };
            xhr.open("get", url, true);
            xhr.send(null);
        },
    },
    watch: {},
};
</script>
