<template src="./index.html"></template>

<script>
// @ is an alias to /src
import "./style.scss";
import PER from "../../views/per/script";
import Corporations from "../../views/corporations/script";

export default {
    name: "Tab",
    props: [],
    mounted: function () {},
    data() {
        return {
            activeName: "first",
        };
    },
    components: {
        PER,
        Corporations,
    },
    computed: {},
    methods: {},
    watch: {},
};
</script>
