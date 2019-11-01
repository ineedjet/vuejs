<template lang='pug'>
   q-form(@submit.prevent='createInteraction')#newOrganisation.full-width
     .row.justify-center
       .col.q-gutter-md
         ClientBindOrganisationFormNameInput(
           v-bind:inputErrors="errors.name"
           @blur='setOrganisation'
         )
         .row.justify-center
           q-btn(
             label="Связать"
             type="submit"
           )#addOrganisationBtn
 </template>

<script>
 import ClientBindOrganisationFormNameInput from './ClientBindOrganisationFormNameInput.vue';

 export default {
  components: {
   ClientBindOrganisationFormNameInput,
  },
  props: {
   value: { type: Array, default: () => [] },
  },
  data() {
   return {
    interaction: {
     organisation: '',
    },
    errors: [],
   };
  },
  methods: {
   createInteraction() {
    this.$q.loading.show();
    this.value.forEach(
      (client) => {
       this.$api.interactions
       .create(
         {
          client_id: client.id,
          organisation_id: this.interaction.organisation,
         },
       )
       .then(
         () => {
          this.interaction = {
           organisation: '',
          };
          this.errors = [];
          this.$router.push({ name: 'clients' });
         },
         (errors) => {
          this.errors = errors.response.data;
         },
       )
       .finally(() => {
        this.$q.loading.hide();
       });
      },
    );
   },
   setOrganisation(value) {
    this.interaction.organisation = value;
   },
  },
 };
</script>