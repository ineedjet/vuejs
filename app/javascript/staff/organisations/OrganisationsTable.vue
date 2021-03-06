<template lang='pug'>
  .organisations-table
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
     )#organisations.full-width
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
  import eventBus from '../EventBus';
  export default {
    data() {
      return {
       disableBtn: true,
       selected: [],
       visibleColumns: ['name', 'formOfOwnership', 'inn', 'ogrn', 'actions'],
       loading: false,
       pagination: {
        page: 1,
        rowsPerPage: 15,
       },
       columns: [
        { name: 'id', label: 'ID', field: 'id' },
        { name: 'name', label: 'Название', field: 'name' },
        { name: 'formOfOwnership', label: 'Форма собственности', field: 'formOfOwnership' },
        { name: 'inn', label: 'ИНН', field: 'inn' },
        { name: 'ogrn', label: 'ОГРН', field: 'ogrn' },
        { name: 'actions', label: '', field: 'actions' },
       ],
       data: [],

       organisations: this.getOrganisations(),
      };
    },
    mounted() {
      eventBus.$on('createOrganisation', () => {
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
      getOrganisations() {
        this.$api.organisations
          .index()
          .then(({data}) => {
              this.organisations = data;
            },
          );
      },
      destroy() {
       this.$q.loading.show();
       if (this.selected.length > 0) {
        this.selected.forEach(
          ({id}) => {
           this.$api.organisations
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
       this.$api.organisations
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
           formOfOwnership: record.form_of_ownership,
           inn: record.inn,
           ogrn: record.ogrn,
          });
         },
       );
      },
    },
  };
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
