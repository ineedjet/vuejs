<template lang='pug'>
  .organisations-table
    OrganisationsFilter
    q-table(
      flat
      :data="organisations"
      :columns="columns"
      :filter="filter"
      selection="multiple"
      :selected.sync="selected"
      row-key="id"
      binary-state-sort
      :rows-per-page-options="[5,10,20,100]"
      :loading="isLoading"
      :pagination.sync="pagination"
      @request="requestData"
      no-data-label="Empty list of organisation."
    )#organisations.full-width
      template(v-slot:top)
         h5(v-if="filter")
           | Filtered by "{{ filter }}"
      template(v-slot:body-cell-actions="cellProperties")
        q-td(:props="cellProperties")
          q-btn(
          label="Оборудование"
          no-wrap
          :to="{ name: 'addEquipment', params: { id: cellProperties.row.id.toString() } }"
         )
    .row.justify-center.q-gutter-md
      q-btn(
        label="Удалить"
        @click="destroy"
        :disable='disableBtn'
     )
    router-view
</template>

<script>
  import OrganisationsFilter from './OrganisationsFilter.vue'
  export default {
    components: {
      OrganisationsFilter,
    },
    data() {
      return {
        selected: [],
      }
    },
    computed: {
      disableBtn() { return false },
      filter()        { return this.$store.state.organisationFilter.filter },
      columns()       { return this.$store.state.organisations.columns },
      organisations() { return this.$store.state.organisations.data },
      pagination:     {
        get() { return this.$store.state.organisations.pagination},
        set(value) { this.$store.commit("updatePagination",value) }
      },
      isLoading()     { return this.$store.state.organisations.isLoading },
      actions()     { return this.$store.state.organisations.actions },
    },
    methods: {
      destroy() {
      this.$q.loading.show();
      if (this.selected.length > 0) {
        this.selected.forEach(
          ({id}) => {
           this.$api.organisations
           .destroy(id)
           .then(() => {
             this.requestData({
               pagination: this.pagination,
               filter: undefined
             });
           })
           .finally(() => {
            this.selected = []
            this.$q.loading.hide()
           });
          },
        );
      }
    },
    requestData(requestProp){
        let { page, rowsPerPage, sortBy, descending } = requestProp.pagination
        let filter = requestProp.filter
        this.$store.dispatch('indexOrganisations', { page, rowsPerPage, sortBy, descending, filter })
      },
      doAction(actionName, row){
        if (typeof this[actionName] === 'function') this[actionName](row)
      },
      edit(organisation) {
        this.$router.push({ path: `${this.$route.path}/${organisation.id}/edit` })
      },
      delete(organisation) {
        this.$store.dispatch('deleteOrganisation', organisation.id)
      }
    },
    created() {
      this.requestData({
        pagination: this.pagination,
        filter: undefined
      });
      this.$eventBus.$on('needUpdateOrganisationList', () => {
        this.$refs.table.requestServerInteraction()
      });
    },
    mounted(){
      this.$cable.subscribe({ channel: 'StaffChannel', room: 'organisations' });
    },
    channels: {
      StaffChannel: {
        connected() {
          console.log("! connected")
        },
        rejected() {},
        received(data) {
          console.log("! received")
          this.$refs.table.requestServerInteraction()
        },
        disconnected() {
          console.log("! disconnected")
        },
      }
    },
  }
</script>

<style scoped lang="scss">
  .organisations-table {
    padding-bottom: 20px;
    text-align: center;
    margin: auto;
    th, td {
     padding: 10px 20px;
    }
  }
</style>
