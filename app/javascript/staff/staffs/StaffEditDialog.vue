<template lang='pug'>
   q-dialog(value @hide='$router.go(-1)')
     q-card.dialog-card
       StaffEditForm(:id='id')
 </template>

<script>
  import StaffEditForm from './StaffEditForm.vue';

  export default {
    components: {
      StaffEditForm,
    },
    props: {
      id: { type: String, default: '' },
    },
  };
</script>

<style lang="scss" scoped>
  .dialog-card {
    width: 100%;
    max-width: 600px;
  }
</style>