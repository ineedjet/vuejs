<template lang='pug'>
  #staff-dashboard
    h1 Staff Dashboard
    h2 Clients:
    tableClients
    ClientForm
</template>

<script>
  import tableClients from './TableClients.vue';
  import ClientForm from './ClientForm.vue';
  export default {
    components: {
      tableClients,
      ClientForm
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
  p, h1, h2 {
    text-align: center;
  }
</style>
