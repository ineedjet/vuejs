import Vue from 'vue';
import VueRouter from 'vue-router';

import Clients from '../clients/Clients.vue';
import Organizations from '../organisations/Organisations.vue';
import Staffs from '../StaffDashboard.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  hashbangs: false,
  base: '/staff',
  routes: [
    { path: '/clients', component: Clients, name: 'clients' },
    { path: '/organizations', component: Organizations, name: 'organizations' },
    { path: '/staffs', component: Staffs, name: 'staffs' },
  ],
});