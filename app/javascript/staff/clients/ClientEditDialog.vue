<template lang='pug'>
   q-dialog(value @hide='$router.go(-1)')
     q-card.dialog-card
       ClientEditForm(:id='id')
 </template>

<script>
  import ClientEditForm from './ClientEditForm.vue';

  export default {
    components: {
      ClientEditForm,
    },
    props: {
      id: { type: String, default: '' },
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