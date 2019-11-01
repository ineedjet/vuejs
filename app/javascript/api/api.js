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
  edit: (id) => adapter.get(`/staff/clients/${id}/edit`),
  update: (id, client) => adapter.patch(`/staff/clients/${id}`, { client }),
};

const staffs = {
  create: (staff) => adapter.post('/staff/staffs', { staff }),
  index: () => adapter.get('/staff/staffs'),
  destroy: (id) => adapter.delete(`/staff/staffs/${id}`),
  edit: (id) => adapter.get(`/staff/staffs/${id}/edit`),
  update: (id, staff) => adapter.patch(`/staff/staffs/${id}`, { staff }),
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
