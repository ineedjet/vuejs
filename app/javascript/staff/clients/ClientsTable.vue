<template lang='pug'>
  .clients-table
    q-table(
      flat
      :data="data"
      :columns="columns"
      :visible-columns='visibleColumns'
      @request="onRequest"
      :pagination.sync="pagination"
      :loading="loading"
      loading-label='Loading organisations...'
      selection="multiple"
      :selected.sync="selected"
      row-key="id"
    )#clients.full-width
      template(v-slot:top)
        q-btn(
          label="Удалить"
          @click="destroy"
          :disable='disableBtn'
        )
        q-btn(
          label="Сбросить пароль"
          no-wrap
          @click="reset"
          :disable='disableBtn'
        )
        q-btn(
          label="Связать с организацией"
          no-wrap
          :disable='disableBtn'
          :to="{ name: 'bindOrganisation', params: { selected: selected } }"
        )
      template(v-slot:body-cell-edit="cellProperties")
        q-td(:props="cellProperties")
          q-btn(
              label="Редактировать"
              no-wrap
              :to="{ name: 'editClient', params: { id: cellProperties.row.id.toString() } }"
            )
    router-view
 </template>

<script>
  import eventBus from '../EventBus';
  export default {
   data() {
    return {
     disableBtn: true,
     selected: [],
     visibleColumns: ['name', 'phone', 'email', 'edit'],
     loading: false,
     pagination: {
      page: 1,
      rowsPerPage: 15,
     },
     columns: [
      { name: 'id', label: 'ID', field: 'id' },
      { name: 'name', label: 'Name', field: 'name' },
      { name: 'phone', label: 'Phone', field: 'phone' },
      { name: 'email', label: 'Email', field: 'email' },
      { name: 'edit', label: '', field: 'edit' },
     ],
     data: [],

     clients: this.getClients(),
    };
   },
   mounted() {
    eventBus.$on('createClient', () => {
     this.onRequest();
    });
    this.onRequest();
   },
   updated() {
    this.disableDeleteBtn();
   },
   methods: {
    disableDeleteBtn() {
     this.disableBtn = this.selected.length === 0
    },
    getClients() {
     this.$api.clients
     .index()
     .then(({data}) => {
        this.clients = data;
       },
     );
    },
    reset() {
     this.$q.loading.show();
     if (this.selected.length > 0) {
      this.selected.forEach(
        (client) => {
         this.$api.clients
         .reset_password(client.id)
         .then(() => {
          this.selected = [];
         })
         .finally(() => {
          this.$q.loading.hide();
         });
        },
      );
     }
    },
    destroy() {
     this.$q.loading.show();
     if (this.selected.length > 0) {
      this.selected.forEach(
        ({id}) => {
         this.$api.clients
         .destroy(id)
         .then(() => {
          this.onRequest();
         })
         .finally(() => {
          this.selected = []
          this.$q.loading.hide()
         });
        },
      );
     }
    },
    onRequest() {
     this.loading = true;
     this.$api.clients
     .index()
     .then(({data}) => {
        this.parseResponseData(data);
       },
     )
     .finally(() => {
        this.loading = false;
       },
     );
    },
    parseResponseData(responseData) {
     this.data = [];
     responseData.forEach(
       (record) => {
        this.data.push({
         id: record.id,
         name: record.name,
         email: record.email,
         phone: record.phone
        });
       },
     );
    },
   },
  };
</script>

<style scoped lang="scss">
 .clients-table {
   padding-bottom: 20px;
   text-align: center;
   margin: auto;
   th, td {
    padding: 10px 20px;
   }
 }
</style>
