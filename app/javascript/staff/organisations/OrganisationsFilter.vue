<template lang="pug">
   q-input(
     filled
     label="Поиск"
     v-model.trim="organisationsFilter")
 </template>

<script>
  export default {
    computed: {
     organisationsFilter: {
        get() {
          return this.$store.state.organisations.filter;
        },
        set(value) {
          this.$store.commit("updateOrganisationsFilter", value);
        }
      }
    }
  };
</script>