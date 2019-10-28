<template lang='pug'>
  q-layout(view="hHh lpR fFf")
    q-header(elevated)
     navbar(v-bind:email="email" v-bind:role="role")
    q-page-container
     q-page.doc-page
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
