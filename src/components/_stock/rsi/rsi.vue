<template src="./rsi.html"></template>

<script>
// @ is an alias to /src
import "./rsi.scss";

export default {
    name: "Rsi",
    props: ["stockValue"],
    mounted: function () {},
    data() {
        return {};
    },
    components: {},
    computed: {
        res: function () {
            let response = [false, false];
            if (this.stockValue) {
                // console.log("rsi");
                let value = JSON.stringify(this.stockValue);
                value = JSON.parse(value);
                let r6 = this.rsi6(value);
                let r12 = this.rsi12(value);
                // console.log("r6", r6);
                // console.log("r12", r12);
                // 判斷
                if (r6[0] > r12[0] && r6[1] < r12[1] && r6[0] > 50) {
                    response[0] = true;
                }
            }
            return response;
        },
    },
    methods: {
        rsi6(value) {
            let response = [];
            for (let i = 7; i < value.length; i++) {
                // 方法一
                let UP = this.get6UP(value, i);
                let DN = this.get6DN(value, i);

                // 方法二
                // let UP = (5/6) * beforeUP + Math.abs(value[i].h - value[i-1].h);
                // let DN = (5/6) * beforeDN + Math.abs(value[i].l - value[i-1].l);
                // beforeUP = UP;
                // beforeDN = DN;

                let RSI6 = (UP / (UP + DN)) * 100;
                response.push(RSI6);
            }
            return response.reverse(); // 值
        },
        rsi12(value) {
            let response = [];
            for (let i = 12; i < value.length; i++) {
                // 方法一
                // let UP = this.get12UP(value,i);
                // let DN = this.get12DN(value,i);
                // let RSI12 = (UP / (UP + DN)) * 100;
                // response.push(RSI12);
                // 方法二
            }
            return response.reverse(); // 值
        },
        get6UP(value, i) {
            let rise = 0;
            let arr = [
                value[i].c - value[i - 1].c,
                value[i - 1].c - value[i - 2].c,
                value[i - 2].c - value[i - 3].c,
                value[i - 3].c - value[i - 4].c,
                value[i - 4].c - value[i - 5].c,
                value[i - 5].c - value[i - 6].c,
            ];
            arr.forEach(element => {
                if (element > 0) {
                    rise = rise + element;
                }
            });
            let UP = rise;
            return UP;
        },
        get6DN(value, i) {
            let fall = 0;
            let arr = [
                value[i].c - value[i - 1].c,
                value[i - 1].c - value[i - 2].c,
                value[i - 2].c - value[i - 3].c,
                value[i - 3].c - value[i - 4].c,
                value[i - 4].c - value[i - 5].c,
                value[i - 5].c - value[i - 6].c,
            ];
            arr.forEach(element => {
                if (element < 0) {
                    fall = fall + element;
                }
            });
            let DN = fall * -1;
            return DN;
        },
        get12UP(value, i) {
            let rise = 0;
            let arr = [
                value[i].c - value[i - 1].c,
                value[i - 1].c - value[i - 2].c,
                value[i - 2].c - value[i - 3].c,
                value[i - 3].c - value[i - 4].c,
                value[i - 4].c - value[i - 5].c,
                value[i - 5].c - value[i - 6].c,
                value[i - 6].c - value[i - 7].c,
                value[i - 7].c - value[i - 8].c,
                value[i - 8].c - value[i - 9].c,
                value[i - 9].c - value[i - 10].c,
                value[i - 10].c - value[i - 11].c,
                value[i - 11].c - value[i - 12].c,
            ];
            arr.forEach(element => {
                if (element > 0) {
                    rise = rise + element;
                }
            });
            let UP = rise;
            return UP;
        },
        get12DN(value, i) {
            let fall = 0;
            let arr = [
                value[i].c - value[i - 1].c,
                value[i - 1].c - value[i - 2].c,
                value[i - 2].c - value[i - 3].c,
                value[i - 3].c - value[i - 4].c,
                value[i - 4].c - value[i - 5].c,
                value[i - 5].c - value[i - 6].c,
                value[i - 6].c - value[i - 7].c,
                value[i - 7].c - value[i - 8].c,
                value[i - 8].c - value[i - 9].c,
                value[i - 9].c - value[i - 10].c,
                value[i - 10].c - value[i - 11].c,
                value[i - 11].c - value[i - 12].c,
            ];
            arr.forEach(element => {
                if (element < 0) {
                    fall = fall + element;
                }
            });
            let DN = fall * -1;
            return DN;
        },
    },
    watch: {},
};
</script>
