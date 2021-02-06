import Vue from 'vue';
import Vuex from 'vuex';
import Stock from './stock.json';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stock: Stock,
    },
    getters: {
        code: state => {
            if (state.list) {
                return Object.keys(state.list);
            }
        },
        ma5: state => {
            if (state.data) {
                let arr = [];
                for (let i = 4; i < state.data.ta.length; i++) {
                    let element =
                        (state.data.ta[i].c +
                            state.data.ta[i - 1].c +
                            state.data.ta[i - 2].c +
                            state.data.ta[i - 3].c +
                            state.data.ta[i - 4].c) /
                        5;
                    arr.push(element);
                }
                return arr;
            }
        },
        ma10: state => {
            if (state.data) {
                let arr = [];
                for (let i = 9; i < state.data.ta.length; i++) {
                    let element =
                        (state.data.ta[i].c +
                            state.data.ta[i - 1].c +
                            state.data.ta[i - 2].c +
                            state.data.ta[i - 3].c +
                            state.data.ta[i - 4].c +
                            state.data.ta[i - 5].c +
                            state.data.ta[i - 6].c +
                            state.data.ta[i - 7].c +
                            state.data.ta[i - 8].c +
                            state.data.ta[i - 9].c) /
                        10;
                    arr.push(element);
                }
                return arr;
            }
        },
        ma20: state => {
            if (state.data) {
                let arr = [];
                for (let i = 0; i < 15; i++) {
                    arr.push(150);
                }
                for (let i = 19; i < state.data.ta.length; i++) {
                    let element =
                        (state.data.ta[i].c +
                            state.data.ta[i - 1].c +
                            state.data.ta[i - 2].c +
                            state.data.ta[i - 3].c +
                            state.data.ta[i - 4].c +
                            state.data.ta[i - 5].c +
                            state.data.ta[i - 6].c +
                            state.data.ta[i - 7].c +
                            state.data.ta[i - 8].c +
                            state.data.ta[i - 9].c +
                            state.data.ta[i - 10].c +
                            state.data.ta[i - 11].c +
                            state.data.ta[i - 12].c +
                            state.data.ta[i - 13].c +
                            state.data.ta[i - 14].c +
                            state.data.ta[i - 15].c +
                            state.data.ta[i - 16].c +
                            state.data.ta[i - 17].c +
                            state.data.ta[i - 18].c +
                            state.data.ta[i - 19].c) /
                        20;
                    arr.push(element);
                }
                return arr;
            }
        },
    },
    mutations: {
        setData(state, data) {
            state.data = data;
        },
        setToken(state, data) {
            state.token = data;
        },
    },
    actions: {
        getdata(mutations, { url, mutation }) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200) {
                        let str = xhr.responseText
                            .replace(
                                'jQuery111306382856220483186_1591513211276(',
                                '',
                            )
                            .replace(');', '');
                        mutations.commit(mutation, JSON.parse(str));
                    } else {
                        console.log(xhr.responseText);
                    }
                }
            };
            xhr.open('get', url, true);
            xhr.setRequestHeader(
                'Authorization',
                `Bearer ${localStorage.getItem('_token')}`,
            );
            xhr.send(null);
        },

        postdata(mutations, { url, mutation, data }) {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));
                    mutations.commit(mutation, xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            };
            xhr.open('Post', url, true);
            xhr.setRequestHeader(
                'content-type',
                'application/x-www-form-urlencoded',
            );
            xhr.setRequestHeader(
                'Authorization',
                `Bearer ${localStorage.getItem('_token')}`,
            );
            xhr.send(data);
        },

        // 登入
        login(mutations, { url, data }) {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == 200) {
                    localStorage.setItem('_token', xhr.responseText);
                } else {
                    alert(xhr.status);
                }
            };
            xhr.open('Post', url, true);
            xhr.setRequestHeader(
                'content-type',
                'application/x-www-form-urlencoded',
            );
            xhr.send(data);
        },
    },
    modules: {},
});
