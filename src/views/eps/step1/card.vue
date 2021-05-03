<template>
    <div class="card">
        <div class="card-head"></div>
        <div class="stock-id" v-bind:class="{ selected: select }" >1234</div>
        <div class="card-message">哈囉哈囉</div>
        <div class="card-body"></div>
    </div>
</template>

<style>
.card{
    position: relative;
    width: 200px;
    box-shadow: 0 0 2px #000;
    border-radius: 50%;
    overflow: hidden;
    margin:50px;
}
.card-head{
    height: 100px;
    background: red;
    border-bottom: 5px solid #555555;
}
.card-body{
    border-top: 5px solid #555555;
    height: 100px;
}
.stock-id{
    cursor: pointer;
    border-radius: 50%;
    width:50px;
    height:50px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    line-height: 50px;;
    text-align: center;
    vertical-align: middle;
    color:#9e9e9e;
    border:1px solid #e8e8e8;
    box-shadow: 0 0 1px 10px #555;
}
.card-message{
    position: absolute;
    background: #fff;
    box-shadow: 0 0 2px #000;
    right: 0;
}
.stock-id:hover+.card-message{
}
.selected{
    background: #e04f48;
    color:#fff;
}
</style>

<script>
export default {
    name: "Self",
    mounted: function () {},
    props:['stock'],
    components: {
    },
    data() {
        return {
            select:true
        };
    },
    methods: {
    }
};
</script>
