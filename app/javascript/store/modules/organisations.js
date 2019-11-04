export default {
  state: {
    isLoading: false,
    data: [],
    columns: [],
    pagination: {},
    actions: [],
  },
  mutations: {
    updateOrganisations(state, organisations) {
      state.data = organisations;
    },
    updatePagination(state, pagination) {
      state.pagination = pagination;
      state.pagination.page = Number(state.pagination.page);
      state.pagination.descending = (state.pagination.descending === "true");
    },
    updateColumns(state, value) {
      state.columns = value
    },
    updateActions(state, value) {
      state.actions = value
    },
    updateRowsNumber(state, count) {
      state.pagination.rowsNumber = count;
    }
  },
  actions: {
    indexOrganisations(context, params){
      this._vm.$api.organisations
      .index(params)
      .then(
        (response) => {
          context.commit('updateOrganisations', response.data.data.map(i => i.attributes));
          context.commit('updatePagination', response.data.meta.pagination);
          context.commit('updateColumns', response.data.meta.columns);
          context.commit('updateActions', response.data.meta.actions);
        }).finally(() => (context.state.isLoading = false));
    },
    deleteOrganisation(context, id){
      this._vm.$api.organisations
      .destroy(id)
      .then(
        response => {
          context.dispatch('indexOrganisations');
          this._vm.$q.notify({
            icon: 'fas fa-trash',
            color: 'positive',
            message: 'Successfully deleted'
          })
        },
        errors => {
          this._vm.$q.notify({
            color: 'negative',
            message: errors.response.data
          });
        })
    },
  },
}
