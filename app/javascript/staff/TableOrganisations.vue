<template lang='pug'>
  .row.justify-center
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
     .row.justify-center
       q-btn(
         label="Удалить"
         @click="destroy"
         :disable='disableBtn'
       )
</template>

<script>
  import eventBus from './EventBus';
  import TableOrganisationRow from './TableOrganisationRow.vue';

  export default {
    components: {
      TableOrganisationRow,
    },
    data() {
      return {
       disableBtn: true,
       selected: [],
       visibleColumns: ['name', 'formOfOwnership', 'inn', 'ogrn'],
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
  table {
   text-align: center;
    margin: auto;
    th, td {
     padding: 10px 20px;
    }
  }
</style>
