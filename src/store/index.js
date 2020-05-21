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
    mutations: {},
    actions: {},
    modules: {},
})
