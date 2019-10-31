<template lang='pug'>
  .staffs-table
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
    )#staffs.full-width
    .row.justify-center
      q-btn(
        label="Удалить"
        @click="destroy"
        :disable='disableBtn'
      )
 </template>

<script>
  import eventBus from '../EventBus';
  export default {
   data() {
    return {
     disableBtn: true,
     selected: [],
     visibleColumns: ['name', 'phone', 'email'],
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
     ],
     data: [],

     staffs: this.getStaffs(),
    };
   },
   mounted() {
    eventBus.$on('createStaff', () => {
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
    getStaffs() {
     this.$api.staffs
     .index()
     .then(({data}) => {
        this.staffs = data;
       },
     );
    },
    destroy() {
     this.$q.loading.show();
     if (this.selected.length > 0) {
      this.selected.forEach(
        ({id}) => {
         this.$api.staffs
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
     this.$api.staffs
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
 .staffs-table {
   padding-bottom: 20px;
   text-align: center;
   margin: auto;
   th, td {
    padding: 10px 20px;
   }
 }
</style>
