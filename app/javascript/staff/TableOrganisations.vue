<template lang='pug'>
   table.table.mt-5#clients
     thead
       tr
         th(scope='col') Name
         th(scope='col') Inn
         th(scope='col') Ogrn
     tbody
       TableOrganisationRow(v-for="organisation in organisations" :organisation="organisation" :key="organisation.id")
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
       organisations: this.getOrganisations(),
      };
    },
    mounted() {
      eventBus.$on('createOrganisation', () => {
        this.getOrganisations();
      });
    },
    methods: {
      getOrganisations() {
        this.$api.organisations
          .index()
          .then(
            (response) => {
              this.organisations = response.data;
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
