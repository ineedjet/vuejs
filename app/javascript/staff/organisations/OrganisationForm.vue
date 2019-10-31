<template lang='pug'>
 #organisation-form
  h6 добавить:
  q-form(@submit.prevent='createOrganisation')
    #name
     q-input(
       filled
       v-model="name"
       label="Name"
       :rules="[() => !nameError || 'Minimum 5 characters']"
     )
    #inn
      q-input(
        filled
        v-model="inn"
        label="Inn"
        :rules="[() => !innError || 'Field is required']"
      )
    #ogrn
      q-input(
        filled
        v-model="ogrn"
        label="Ogrn"
        :rules="[() => !ogrnError || 'Field is required']"
      )
    #form_of_ownership
     q-input(
       filled
       v-model="formOfOwnership"
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
    p.api-errors {
      color: red;
    }
  }
</style>
