import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        codes: {},
        lastDate: "????-??-??",
    },
    getters: {},
    mutations: {
        setCodes(state, data) {
            state.codes = data;
        },
        setLastDate(state, data) {
            state.lastDate = data;
        },
    },
    actions: {},
    modules: {},
});
