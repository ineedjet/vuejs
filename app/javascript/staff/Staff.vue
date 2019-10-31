<template lang='pug'>
  q-layout(view="hHh lpR fFf")
    q-header(elevated)
     navbar(v-bind:email="email" v-bind:role="role")
    Drawer
    q-page-container
      q-page.doc-page
        router-view
</template>

<script>
  import Navbar from './../Navbar.vue';
  import StaffDashboard from './StaffDashboard.vue';
  import Drawer from './Drawer.vue';

  export default {
    components: {
      Navbar,
      StaffDashboard,
      Drawer
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
  #navbar{
    height: 65px;
  }
  p {
    color: $blue;
    font-size: 2em;
    text-align: center;
  }
  .q-page-container{
    margin: 0px;
  }
</style>
