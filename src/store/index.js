import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import auth from './modules/auth'
import offers from './modules/offers'

Vue.use(Vuex)

const authStorage = new VuexPersist({
  key: 'lemoneykey',
  storage: localStorage,
  modules: ['auth']
})

const store = new Vuex.Store({
  modules: {
    auth,
    offers
  },
  plugins: [authStorage.plugin]
})

export default store
