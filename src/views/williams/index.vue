<template>
    <div>
        <Loading v-if="loading"/>
        <Cards :handle-loading="handleLoading" :loading="loading"/>
    </div>
</template>

<style>
</style>

<script>
import Cards from './cards';
import Loading from './loading';
export default {
    name: "Lower",
    mounted: function () {
    },
    components: {
        Cards,
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
