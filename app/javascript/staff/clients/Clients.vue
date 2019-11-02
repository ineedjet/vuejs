<template lang='pug'>
  .clients
    h4.text-center Клиенты:
    ClientsTable
    ClientForm
</template>

<script>
  import ClientsTable from './ClientsTable.vue';
  import ClientForm from './ClientForm.vue';

  export default {
    components: {
      ClientsTable,
      ClientForm,
    },
    props: {
      email: {
        default: ''
      },
      role: {
        default: ''
      }
    },
    data: function () {
      return {
        message: "Hello Staff!"
      }
    }
  }
</script>

<style scoped lang="scss">
  .clients{
    padding: 20px;
  }
</style>