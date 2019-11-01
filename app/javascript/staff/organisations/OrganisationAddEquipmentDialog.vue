<template lang='pug'>
   q-dialog(value @hide='$router.go(-1)')
     q-card.dialog-card
       q-card-section
         ClientAddEquipmentForm
 </template>

<script>
  import ClientAddEquipmentForm from './OrganisationAddEquipmentForm.vue';

  export default {
    components: {
      ClientAddEquipmentForm,
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