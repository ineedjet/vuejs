<template lang='pug'>
  .staff-form
    h6 добавить:
    form(@submit.prevent='createStaff')
      q-input(
        filled
        v-model="staff.name"
        label="Name"
        :rules="[() => !nameError || 'Minimum 5 characters']"
      )
      q-input(
        filled
        v-model="staff.phone"
        label="Phone"
        :rules="[() => !phoneError || 'Not empty, numbers']"
      )
      q-input(
        filled
        v-model="staff.email"
        label="Email"
        :rules="[() => !emailError || 'Not empty, email']"
      )
      q-input(
        filled
        v-model="staff.password"
        label="Password"
      )
      br
      br
      q-input(
        filled
        v-model="staff.passwordConfirmation"
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
       staff: {
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
     nameError: function () { return !(this.staff.name.length > 4) },
     phoneError: function () { return !(this.staff.phone.length > 0 && Number.isFinite(Number(this.staff.phone))) },
     emailError: function () { return !(this.staff.email.length > 0 && emailRegex.test(this.staff.email)) }
   },
   methods: {
     createStaff() {
     this.$api.staffs
         .create(this.staff)
         .then(
           () => {
            this.user = {};
            this.apiErrors = '';
            this.handleCreateStaff();
           },
           (errors) => {
            this.apiErrors = errors.response.data
           },
         );
     this.submitted = false;
    },
    handleCreateStaff() {
     eventBus.$emit('createStaff');
    },
   },
  };
</script>

<style scoped lang="scss">
 .staff-form {
  p.api-errors {
   color: red;
  }
 }
</style>
