<template src="./index.html"></template>

<script>
// @ is an alias to /src
import "./style.scss";
import UpdateButton from "../updateButton/script";

export default {
    name: "Tab",
    props: [],
    mounted: function () {},
    data() {
        return {
            drawer: false,
        };
    },
    components: {
        UpdateButton,
    },
    computed: {
        lastDate() {
            return this.$store.state.lastDate;
        },
    },
    methods: {},
    watch: {},
};
</script>
