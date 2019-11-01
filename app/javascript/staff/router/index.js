import Vue from 'vue';
import VueRouter from 'vue-router';

import Clients from '../clients/Clients.vue';
import Organisations from '../organisations/Organisations.vue';
import Staffs from '../staffs/Staffs.vue';

import ClientEditDialog from '../clients/ClientEditDialog.vue';
import StaffEditDialog from '../staffs/StaffEditDialog.vue';
import ClientBindOrganisationDialog from '../clients/ClientBindOrganisationDialog.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  hashbangs: false,
  base: '/staff',
  routes: [
    { path: '/clients', component: Clients, name: 'clients', children:
      [
        {
          path: '/clients/:id/edit',
          component: ClientEditDialog,
          name: 'editClient',
          props: true,
        },
        {
          path: '/clients/bind/organisation',
          component: ClientBindOrganisationDialog,
          name: 'bindOrganisation',
          props: true,
        },
      ]
    },
    { path: '/organisations', component: Organisations, name: 'organisations' },
    { path: '/staffs', component: Staffs, name: 'staffs', children:
      [
        {
          path: '/staffs/:id/edit',
          component: StaffEditDialog,
          name: 'editStaff',
          props: true,
        },
      ]
    },
  ],
});