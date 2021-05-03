import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import HighchartsVue from "highcharts-vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./registerServiceWorker";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(HighchartsVue);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
