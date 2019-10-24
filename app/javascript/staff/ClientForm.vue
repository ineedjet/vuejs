<template lang='pug'>
 #client-form
  form(@submit.prevent='createClient')
    #name
     label(for='name') Name
     input(v-model="name")
     span.error(v-if="nameError") Minimum 5 characters
    #phone
     label(for='phone') Phone
     input(v-model="phone")
     span.error(v-if="phoneError") Not empty, numbers
    #email
     label(for='email') Email
     input(v-model="email")
     span.error(v-if="emailError") Not empty, email
    br
    #password
     label(for='email') Password
     input(v-model="password")
    #password-confirmation
     label(for='email') Password confirmation
     input(v-model="passwordConfirmation")

    p.api-errors {{ apiErrors }}

    button(:disabled='nameError || nameError || emailError') Save
 </template>

<script>
 import eventBus from './EventBus';
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 export default {
   data() {
     return {
       name: 'UserName',
       phone: '+79654401728',
       email: 'some@jkhgf.com',
       password: 'password_confirmation',
       passwordConfirmation: 'password_confirmation',
       apiErrors: '',
     };
   },
   computed: {
     nameError: function () { return !(this.name.length > 4) },
     phoneError: function () { return !(this.phone.length > 0 && Number.isFinite(Number(this.phone))) },
     emailError: function () { return !(this.email.length > 0 && emailRegex.test(this.email)) }
   },
   methods: {
     createClient() {
     this.$api.clients
         .post({
           name: this.name,
           email: this.email,
           phone: this.phone,
           password: this.password,
           password_confirmation: this.passwordConfirmation
         })
         .then(
           () => {
            this.user = {};
            this.apiErrors = '';
            this.handleCreateClient();
           },
           (errors) => {
            this.apiErrors = errors.response.data
           },
         );
     this.submitted = false;
    },
    handleCreateClient() {
     eventBus.$emit('createClient');
    },
   },
  };
</script>

<style scoped lang="scss">
  #client-form {
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
