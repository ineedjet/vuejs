import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import organisations from './modules/organisations'
import organisationFilter from './modules/organisation-filter'

export default new Vuex.Store({
  state: {
    currentUser: null,
  },
  mutations: {},
  actions: {},
  modules: {
    organisations,
    organisationFilter,
  },
})
