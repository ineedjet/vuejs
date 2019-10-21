<template lang='pug'>
  a(:href="'/'+ role + 's/sign_out'") Log out {{role}}
</template>

<script>
  export default {
   props: {
    role: {
     default: ''
    }
   }
  };
</script>

<style scoped lang="scss">
  a {
    color: #304455;
    font-family: "Helvetica Neue", Arial, sans-serif;
    cursor: pointer;
    padding-bottom: 3px;
    white-space: nowrap;
    text-decoration: none;
  }
</style>
