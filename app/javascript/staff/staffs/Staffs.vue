<template lang='pug'>
  .clients
    h4.text-center Сотрудники:
    StaffsTable
    StaffForm
</template>

<script>
  import StaffsTable from './StaffsTable.vue';
  import StaffForm from './StaffForm.vue';

  export default {
    components: {
      StaffsTable,
      StaffForm,
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