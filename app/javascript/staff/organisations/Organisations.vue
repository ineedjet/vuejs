<template lang='pug'>
  .staff-dashboard
    h4.text-center Организации:
    OrganisationsTable
    OrganisationForm
</template>

<script>
  import OrganisationsTable from './OrganisationsTable.vue';
  import OrganisationForm from './OrganisationForm.vue';

  export default {
    components: {
      OrganisationsTable,
      OrganisationForm,
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
  .staff-dashboard{
    padding: 20px;
  }
</style>