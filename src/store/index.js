import Vue from 'vue'
import Vuex from 'vuex'
import data from './data'
import flied from './list'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        flied,
        data,
    },
    getters: {
        // pages: state => {
        //     if (state.user.length % 5 > 0) {
        //         return Math.floor(state.user.length / 5 + 1)
        //     } else {
        //         return Math.floor(state.user.length / 5)
        //     }
        // },
    },
    mutations: {
        // setUser(state, data) {
        //     state.user = data
        // },
    },
    actions: {
        // getdata(mutations, { url, mutation }) {
        //     var xhr = new XMLHttpRequest()
        //     xhr.onreadystatechange = () => {
        //         if (xhr.readyState == XMLHttpRequest.DONE) {
        //             if (xhr.status == 200) {
        //                 mutations.commit(mutation, JSON.parse(xhr.responseText))
        //             } else {
        //                 alert(xhr.status)
        //             }
        //         }
        //     }
        //     xhr.open('get', url, true)
        //     xhr.send(null)
        // },
    },
    modules: {},
})
