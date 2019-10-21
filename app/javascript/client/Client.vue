<template lang='pug'>
  #app
    navbar(v-bind:email="email" v-bind:role="role")
    p {{ message }}
</template>

<script>
  import Navbar from './../Navbar.vue';

  export default {
    components: {
      Navbar,
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
        message: "Hello Client!"
      }
    }
  }
</script>

<style scoped lang="scss">
  $blue: #3bbfce;
  p {
    color: $blue;
    font-size: 2em;
    text-align: center;
  }
</style>
