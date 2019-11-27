import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin/index.js'
import music from './music'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    music
  }
})
