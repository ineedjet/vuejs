<template lang='pug'>
  .organisations
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
  }
</script>

<style scoped lang="scss">
  .organisations{
    padding: 20px;
  }
</style>