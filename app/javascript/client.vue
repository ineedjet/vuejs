<template lang='pug'>
  #app
    p {{ message }}
</template>

<script>
export default {
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
