<template lang='pug'>
  .organisation-form
    h6 добавить:
    q-form(@submit.prevent='createOrganisation')
      q-input(
        filled
        v-model="organisation.name"
        label="Name"
        :rules="[() => !nameError || 'Minimum 5 characters']"
      )
      q-input(
        filled
        v-model="organisation.inn"
        label="Inn"
        :rules="[() => !innError || 'Field is required']"
      )
      q-input(
        filled
        v-model="organisation.ogrn"
        label="Ogrn"
        :rules="[() => !ogrnError || 'Field is required']"
      )
      q-input(
        filled
        v-model="organisation.formOfOwnership"
        label="Form of ownership"
        :rules="[() => !formOfOwnershipError || 'Field is required']"
       )
      p.api-errors {{ apiErrors }}
      q-btn(type="submit" :disabled='nameError || innError || ogrnError || formOfOwnershipError') Save
 </template>

<script>
 import eventBus from '../EventBus';
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 export default {
   data() {
     return {
       organisation: {
         name: 'Organisation Name',
         inn: '124954401728',
         ogrn: '98765',
         formOfOwnership: 'ООО',
       },
       apiErrors: ''
     };
   },
   computed: {
     nameError: function () { return !(this.organisation.name.length > 4) },
     innError: function () { return !(this.organisation.inn.length > 0) },
     ogrnError: function () { return !(this.organisation.ogrn.length > 0) },
     formOfOwnershipError: function () { return !(this.organisation.formOfOwnership.length > 0) }
   },
   methods: {
     createOrganisation() {
     this.$api.organisations
         .create(this.organisation)
         .then(
           () => {
            this.user = {};
            this.apiErrors = '';
            this.handleCreateOrganisation();
           },
           (errors) => {
            this.apiErrors = errors.response.data
           },
         );
     this.submitted = false;
    },
    handleCreateOrganisation() {
     eventBus.$emit('createOrganisation');
    },
   },
  };
</script>

<style scoped lang="scss">
  .organisation-form {
    p.api-errors {
      color: red;
    }
  }
</style>
