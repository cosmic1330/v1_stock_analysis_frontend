<template src="./index.html"></template>

<script>
// @ is an alias to /src
import "./style.scss";
import {
    Get_Yahoo_Price,
    Save_Price_to_DB,
    Save_Trading_Date_to_DB,
    Save_PER_to_DB,
    Save_Corporation_to_DB,
    Check_Stock_With_Date,
} from "../../api/api.js";
export default {
    name: "UpdateButton",
    props: [],
    mounted: function () {},
    data() {
        return {
            disabled: false,
            price: [],
        };
    },
    components: {},
    computed: {},
    methods: {
        // 顯示提示訊息
        openInfo(title, message) {
            this.$notify.info({
                title: title,
                message: message,
                position: "top-left",
            });
        },
        openSuccess(title, message) {
            this.$notify({
                title: title,
                message: message,
                position: "top-left",
                type: "success",
            });
        },
        async handleClick() {
            try {
                await this.getTradingDate();
                await this.getPERData();
                await this.getCorporationsData();
                await this.getStockPrice();
                this.openInfo("成功", "更新完成");
                this.disabled = false;
            } catch (error) {
                this.$notify.error({
                    title: "更新失敗",
                    message: error,
                    position: "top-left",
                });
                this.disabled = false;
            }
        },
        // 1.更新最新交易日
        async getTradingDate() {
            await Save_Trading_Date_to_DB();
            this.openSuccess("成功", "更新最新交易日");
        },
        // 2.更新本益比
        async getPERData() {
            await Save_PER_to_DB();
            this.openSuccess("成功", "更新最新本益比");
        },
        // 3.更新三大法人買賣超
        async getCorporationsData() {
            await Save_Corporation_to_DB();
            this.openSuccess("成功", "更新最新三大法人買賣超");
        },
        // 4.更新股價
        async getStockPrice() {
            this.disabled = true;
            try {
                let price = {};
                let AllPrice = {};
                let codes = this.$store.state.codes;
                codes = Object.keys(codes);
                let date = this.$store.state.lastDate;
                let tsmc = await Check_Stock_With_Date(2330,date);
                let delta = await Check_Stock_With_Date(2308,date);
                // 判斷用戶端有沒有最新股價
                if (tsmc.data===true&&delta.data==='true') {
                    return false;
                } else {
                    for (let i = 0; i < codes.length; i++) {
                        const element = codes[i];
                        let response = await Get_Yahoo_Price(element);
                        response = response.data
                            .replace("jQuery111306382856220483186_1591513211276(", "")
                            .replace(");", "");
                        response = JSON.parse(response).ta;
                        response = response.map(element => {
                            let obj = {
                                hight_price: element.h, // 最高價
                                low_price: element.l, // 最低價
                                open_price: element.o, // 開盤價
                                close_price: element.c, // 收盤價
                                volume: element.v, // 交易量
                                date: element.t,
                            };
                            return obj;
                        });
                        price[element] = response;
                        AllPrice[element] = response;
                        // 分階段上傳
                        if (i === Math.round(codes.length / 4)) {
                            this.savePrice(price); // 第一次上傳
                            price = {};
                        } else if (i === Math.round((codes.length / 4) * 2)) {
                            this.savePrice(price); // 第二次上傳
                            price = {};
                        } else if (i === Math.round((codes.length / 4) * 3)) {
                            this.savePrice(price); // 第三次上傳
                            price = {};
                        } else if (i === codes.length - 1) {
                            await this.savePrice(price); // 第四次上傳
                        }
                    }
                }
                this.openSuccess("成功", "取得全部股價");
            } catch (error) {
                console.log(error);
            }
        },
        async savePrice(price) {
            let data = `data=${JSON.stringify(price)}`;
            await Save_Price_to_DB(data).then(response => console.log(response));
        },
    },
    watch: {},
};
</script>
