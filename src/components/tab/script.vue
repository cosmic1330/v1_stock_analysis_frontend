<template src="./index.html"></template>

<script>
// @ is an alias to /src
import "./style.scss";
import PER from "../../views/home/per/script";
import Corporations from "../../views/home/corporations/script";
import Skill from "../../views/home/skill/script";
import Chart3 from "../../views/home/3chart/script";
import ChartGold from "../../views/home/goldchart/script";
export default {
    name: "Tab",
    props: [],
    mounted: function () {},
    data() {
        return {
            activeName: "fourth",
        };
    },
    components: {
        PER,
        Corporations,
        Skill,
        Chart3,
        ChartGold,
    },
    computed: {},
    methods: {},
    watch: {},
};
</script>
