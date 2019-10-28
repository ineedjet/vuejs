<template lang='pug'>
  #staff-dashboard
    h1 Staff Dashboard
    h2 Clients:
    tableClients
    ClientForm
    h2 Organisations:
    tableOrganisations
    OrganisationForm
</template>

<script>
  import TableClients from './TableClients.vue';
  import ClientForm from './ClientForm.vue';
  import TableOrganisations from './TableOrganisations.vue';
  import OrganisationForm from './OrganisationForm.vue';

  export default {
    components: {
      TableClients,
      ClientForm,
      TableOrganisations,
      OrganisationForm
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
