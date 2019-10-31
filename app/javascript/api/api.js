import axios from 'axios';

const metaCsrfToken = document.querySelector('meta[name="csrf-token"]');

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': metaCsrfToken ? metaCsrfToken.getAttribute('content') : '',
};

const adapter = axios.create({
  baseURL: '/api/',
});

const clients = {
  create: (client) => adapter.post('/staff/clients', { client }),
  index: () => adapter.get('/staff/clients'),
  destroy: (id) => adapter.delete(`/staff/clients/${id}`),
};

const staffs = {
  create: (staff) => adapter.post('/staff/staffs', { staff }),
  index: () => adapter.get('/staff/staffs'),
  destroy: (id) => adapter.delete(`/staff/staffs/${id}`),
};

const organisations = {
  create: (organisation) => adapter.post('/staff/organisations', { organisation }),
  index: () => adapter.get('/staff/organisations'),
  destroy: (id) => adapter.delete(`/staff/organisations/${id}`),
};

export default {
  clients,
  staffs,
  organisations
};
