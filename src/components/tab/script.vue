<template src="./index.html"></template>

<script>
// @ is an alias to /src
import "./style.scss";
import PER from "../../views/home/per/script";
import Corporations from "../../views/home/corporations/script";
import Skill from "../../views/home/skill/script";

export default {
    name: "Tab",
    props: [],
    mounted: function () {},
    data() {
        return {
            activeName: "third",
        };
    },
    components: {
        PER,
        Corporations,
        Skill,
    },
    computed: {},
    methods: {},
    watch: {},
};
</script>
