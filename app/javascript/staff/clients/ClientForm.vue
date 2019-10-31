<template lang='pug'>
  .client-form
    h6 добавить:
    form(@submit.prevent='createClient')
      q-input(
        filled
        v-model="name"
        label="Name"
        :rules="[() => !nameError || 'Minimum 5 characters']"
      )
      q-input(
        filled
        v-model="phone"
        label="Phone"
        :rules="[() => !phoneError || 'Not empty, numbers']"
      )
      q-input(
        filled
        v-model="email"
        label="Email"
        :rules="[() => !emailError || 'Not empty, email']"
      )
      q-input(
        filled
        v-model="password"
        label="Password"
      )
      br
      br
      q-input(
        filled
        v-model="passwordConfirmation"
        label="Password confirmation"
      )
      p.api-errors {{ apiErrors }}
      q-btn(type="submit" :disabled='nameError || phoneError || emailError') Save
 </template>

<script>
 import eventBus from '../EventBus';
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
         .create({
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
 .client-form {
  p.api-errors {
   color: red;
  }
 }
</style>
