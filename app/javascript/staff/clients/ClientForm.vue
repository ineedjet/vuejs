<template lang='pug'>
  .client-form
    h6 добавить:
    form(@submit.prevent='createClient')
      q-input(
        filled
        v-model="client.name"
        label="Name"
        :rules="[() => !nameError || 'Minimum 5 characters']"
      )
      q-input(
        filled
        v-model="client.phone"
        label="Phone"
        :rules="[() => !phoneError || 'Not empty, numbers']"
      )
      q-input(
        filled
        v-model="client.email"
        label="Email"
        :rules="[() => !emailError || 'Not empty, email']"
      )
      q-input(
        filled
        v-model="client.password"
        label="Password"
      )
      br
      br
      q-input(
        filled
        v-model="client.passwordConfirmation"
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
       client: {
        name: 'UserName',
        phone: '+79654401728',
        email: 'some@jkhgf.com',
        password: 'password_confirmation',
        passwordConfirmation: 'password_confirmation',
       },
        apiErrors: '',
     };
   },
   computed: {
     nameError: function () { return !(this.client.name.length > 4) },
     phoneError: function () { return !(this.client.phone.length > 0 && Number.isFinite(Number(this.client.phone))) },
     emailError: function () { return !(this.client.email.length > 0 && emailRegex.test(this.client.email)) }
   },
   methods: {
     createClient() {
     this.$api.clients
       .create(this.client)
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
