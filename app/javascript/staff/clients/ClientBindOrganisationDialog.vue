<template lang='pug'>
   q-dialog(value @hide='$router.go(-1)')
     q-card.dialog-card
       q-card-section
         ClientBindOrganisationForm(v-model='selected')
 </template>

<script>
  import ClientBindOrganisationForm from './ClientBindOrganisationForm.vue';

  export default {
    components: {
      ClientBindOrganisationForm,
    },
    props: {
      id: { type: String, default: '' },
      selected: { type: Array, default: () => [] },
    },
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss" scoped>
  .dialog-card {
    width: 100%;
    max-width: 600px;
  }
</style>