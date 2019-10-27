<template lang='pug'>
  #app
    navbar(v-bind:email="email" v-bind:role="role")
    p {{ message }}
    StaffDashboard
</template>

<script>
  import Navbar from './../Navbar.vue';
  import StaffDashboard from './StaffDashboard.vue';

  export default {
    components: {
      Navbar,
      StaffDashboard
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
  $blue: #3bbfce;
  p {
    color: $blue;
    font-size: 2em;
    text-align: center;
  }
</style>
