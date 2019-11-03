import Vue from 'vue'

import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

import '../assets/styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'

import {
  ClosePopup,
  Quasar,
  QLayout,
  QCardSection,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QAvatar,
  QSpace,
  QBtn,
  QChip,
  QDialog,
  QTable,
  QTh,
  QTr,
  QTd,
  QForm,
  QInput,
  QCard,
  QSpinner,
  QSpinnerTail,
  Loading,
  QSelect,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
} from 'quasar'

import router from '../staff/router/index';
import store from '../store'
import Staff from '../staff/Staff.vue'
import api from '../api/api';

Vue.use(Quasar, {
  config: {
    loading: {
      spinner: QSpinnerTail,
    },
  },
  components: {
    QLayout,
    QCardSection,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QAvatar,
    QSpace,
    QBtn,
    QChip,
    QDialog,
    QTable,
    QTh,
    QTr,
    QTd,
    QForm,
    QInput,
    QCard,
    QSpinner,
    QSpinnerTail,
    QSelect,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
  },
  directives: {
    ClosePopup,
  },
  iconSet,
  plugins: {
    Loading,
  },
});

Vue.prototype.$api = api;

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(Staff, {
      props: {
        email: document.body.getAttribute('data-email'),
        role: "staff"
      }
    }),
    router,
    store
  }).$mount()
  document.body.appendChild(app.$el)
})
