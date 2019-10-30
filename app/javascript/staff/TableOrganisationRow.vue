<template lang='pug'>
   tr
     td {{organisation.name}}
     td {{organisation.inn}}
     td {{organisation.ogrn}}
 </template>

<script>

  export default {
    props: {
      organisation: {
        type: Object,
        default: {name: 'name'},
      },
    },
    data() {
      return {
      };
    },
  };
</script>

<style scoped lang="scss">
  label {
    color: #34495e;
  }
  th, td {
   padding: 10px 20px;
  }
</style>
