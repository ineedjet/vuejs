<template lang='pug'>
   q-form(@submit.prevent='updateStaff')
      q-input(
        filled
        v-model="user.name"
        label="Name"
      )
      q-input(
        filled
        v-model="user.phone"
        label="Phone"
      )
      q-input(
        filled
        v-model="user.email"
        label="Email"
      )
       q-btn(
         label="Обновить"
         type="submit"
       )
 </template>

<script>
  import eventBus from '../EventBus';

  export default {
    props: {
      id: { type: String, default: '' },
    },
    data() {
      return {
        user: {
          name: '',
          phone: '',
          email: '',
        },
        errors: [],
      };
    },
    watch: {
      name() {
        this.user.name = this.name;
      },
      phone() {
        this.user.phone = this.phone;
      },
      email() {
        this.user.email = this.email;
      },
    },
    created() {
      this.onRequest();
    },
    methods: {
      onRequest() {
        this.$q.loading.show();
        this.$api.staffs
        .edit(this.id)
        .then(
          ({data}) => {
            this.user = {
              name: data.name,
              phone: data.phone,
              email: data.email,
            };
          },
          (errors) => {
            this.errors = errors.response.data;
          },
        )
        .finally(() => {
          this.$q.loading.hide();
        });
      },
      updateStaff() {
        this.$q.loading.show();
        this.$api.staffs
        .update(
          this.id,
          { name: this.user.name, phone: this.user.phone, email: this.user.email },
        )
        .then(
          () => {
            this.user = {};
            this.errors = [];
            eventBus.$emit('createStaff');
            eventBus.$emit('dialogHide');
            this.$router.go(-1);
          },
          (errors) => {
            this.errors = errors.response.data;
          },
        )
        .finally(() => {
          this.$q.loading.hide();
        });
      },
      setEmail(value) {
        this.user.email = value;
      },
      setName(value) {
        this.user.name = value;
      },
      setPhone(value) {
        this.user.phone = value;
      },
    },
  };
</script>

<style scoped lang="scss">
</style>