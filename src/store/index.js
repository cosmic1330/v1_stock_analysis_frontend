import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        codes: {},
        per: [],
        trust: [],
        foreign: [],
        stock: [],
        lastDate: "????-??-??",
        volume: {},
    },
    getters: {},
    mutations: {
        setCodes(state, data) {
            state.codes = data;
        },
        setLastDate(state, data) {
            state.lastDate = data;
        },
        setPer(state, data) {
            state.per = data;
        },
        setTrust(state, data) {
            state.trust = data;
        },
        setForeign(state, data) {
            state.foreign = data;
        },
        setStock(state, data) {
            state.stock = data;
        },
        setVolume(state, data) {
            state.volume = data;
        },
    },
    actions: {},
    modules: {},
});
