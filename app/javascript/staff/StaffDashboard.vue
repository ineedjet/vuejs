<template lang='pug'>
  #staff-dashboard
    h1 Staff Dashboard
</template>

<script>

  export default {
    components: {
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
  p, h1, h2 {
    text-align: center;
  }
</style>
