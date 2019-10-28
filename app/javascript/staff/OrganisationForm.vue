<template lang='pug'>
 #organisation-form
  form(@submit.prevent='createOrganisation')
    #name
     label(for='name') Name
     input(v-model="name")
     span.error(v-if="nameError") Minimum 5 characters
    #inn
     label(for='inn') Inn
     input(v-model="inn")
     span.error(v-if="innError") Not empty
    #ogrn
     label(for='ogrn') Ogrn
     input(v-model="ogrn")
     span.error(v-if="ogrnError") Not empty
    #form_of_ownership
     label(for='form_of_ownership') Form of ownership
     input(v-model="formOfOwnership")
     span.error(v-if="formOfOwnershipError") Not empty

    p.api-errors {{ apiErrors }}

    button(:disabled='nameError || innError || ogrnError') Save
 </template>

<script>
 import eventBus from './EventBus';
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 export default {
   data() {
     return {
       name: 'Organisation Name',
       inn: '124954401728',
       ogrn: '98765',
       formOfOwnership: 'ООО',
       apiErrors: ''
     };
   },
   computed: {
     nameError: function () { return !(this.name.length > 4) },
     innError: function () { return !(this.inn.length > 0) },
     ogrnError: function () { return !(this.ogrn.length > 0) },
     formOfOwnershipError: function () { return !(this.formOfOwnership.length > 0) }
   },
   methods: {
     createOrganisation() {
     this.$api.organisations
         .create({
           name: this.name,
           inn: this.inn,
           ogrn: this.ogrn,
           form_of_ownership: this.formOfOwnership
         })
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
  #organisation-form {
    text-align: center;
    margin: 50px auto 0;
    input{
      width: 150px;
      display: inline-block;
    }
    label {
     margin-right: 10px;
     width: 150px;
     display: inline-block;
    }
    .error{
      margin-left: 10px;
      color: red;
    }
    button {
     margin-top: 10px;
    }
    p.api-errors {
      color: red;
    }
  }
</style>
