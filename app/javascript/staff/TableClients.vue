<template lang='pug'>
   table.table.mt-5#clients
     thead
       tr
         th(scope='col') Name
         th(scope='col') Phone
         th(scope='col') Email
     tbody
       TableClientRow(v-for="client in clients" :client="client" :key="client.id")
 </template>

<script>
  import eventBus from './EventBus';
  import TableClientRow from './TableClientRow.vue';

  export default {
    components: {
      TableClientRow,
    },
    data() {
      return {
        clients: this.getClients(),
      };
    },
    mounted() {
      eventBus.$on('createClient', () => {
        this.getClients();
      });
    },
    methods: {
      getClients() {
        this.$api.clients
          .get_index()
          .then(
            (response) => {
              this.clients = response.data;
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
