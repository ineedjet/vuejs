import Vue from 'vue';
import VueRouter from 'vue-router';

import Clients from '../clients/Clients.vue';
import Organizations from '../organisations/Organisations.vue';
import Staffs from '../staffs/Staffs.vue';

import ClientEditDialog from '../clients/ClientEditDialog.vue';
import StaffEditDialog from '../staffs/StaffEditDialog.vue';

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
      ]
    },
    { path: '/organizations', component: Organizations, name: 'organizations' },
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