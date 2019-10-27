<template lang='pug'>
   tr
     td {{client.name}}
     td {{client.phone}}
     td {{client.email}}
 </template>

<script>

  export default {
    props: {
      client: {
        type: Object,
        default: {name: 'name', email: 'name@email.com'},
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
