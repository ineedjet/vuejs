import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    organisations: {
      list: [],
      filter: '',
    }
  },
  mutations: {
    updateOrganisationsFilter(state, value) {
      state.organisations.filter = value;
    },
    updateOrganisationsList(state, value) {
      state.organisations.list = value;
    }
  },
  actions: {},
  modules: {},
  plugins: [],
})