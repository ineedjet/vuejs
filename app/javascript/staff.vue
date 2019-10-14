<template lang='pug'>
  #app
    p {{ message }}
</template>

<script>
export default {
  data: function () {
    return {
      message: "Hello Staff!"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
