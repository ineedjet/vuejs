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
      template(v-slot:top)
        .row.justify-center
          .col
            q-btn(
              label="Удалить"
              @click="destroy"
              :disable='disableBtn'
            )
          .col
            q-btn(
              label="Сбросить пароль"
              no-wrap
              @click="reset"
              :disable='disableBtn'
            )
      template(v-slot:body-cell-edit="cellProperties")
        q-td(:props="cellProperties")
          q-btn(
              label="Редактировать"
              no-wrap
              :to="{ name: 'editStaff', params: { id: cellProperties.row.id.toString() } }"
            )
    router-view
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
    reset() {
     this.$q.loading.show();
     if (this.selected.length > 0) {
      this.selected.forEach(
        (staff) => {
         this.$api.staffs
         .reset_password(staff.id)
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
