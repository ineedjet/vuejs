<template lang='pug'>
   q-form(@submit.prevent='updateClient')
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
    created() {
      this.onRequest();
    },
    methods: {
      onRequest() {
        this.$q.loading.show();
        this.$api.clients
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
      updateClient() {
        this.$q.loading.show();
        this.$api.clients
        .update(
          this.id,
          { name: this.user.name, phone: this.user.phone, email: this.user.email },
        )
        .then(
          () => {
            this.user = {};
            this.errors = [];
            eventBus.$emit('createClient');
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
    },
  };
</script>