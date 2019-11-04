import axios from 'axios';
import applyConverters from 'axios-case-converter';
import qs from 'qs';

const metaCsrfToken = document.querySelector('meta[name="csrf-token"]');

axios.defaults.headers.common = {
  'xRequestedWith': 'XMLHttpRequest',
  'xCsrfToken': metaCsrfToken ? metaCsrfToken.getAttribute('content') : '',
};

const adapter = applyConverters(
  axios.create({
    baseURL: '/api/',
  })
);

const clients = {
  create: (client) => adapter.post('/staff/clients', { client }),
  index: () => adapter.get('/staff/clients'),
  destroy: (id) => adapter.delete(`/staff/clients/${id}`),
  edit: (id) => adapter.get(`/staff/clients/${id}/edit`),
  update: (id, client) => adapter.patch(`/staff/clients/${id}`, { client }),
  reset_password: (id) => adapter.patch(`/staff/clients/${id}/reset_password`),
};

const staffs = {
  create: (staff) => adapter.post('/staff/staffs', { staff }),
  index: () => adapter.get('/staff/staffs'),
  destroy: (id) => adapter.delete(`/staff/staffs/${id}`),
  edit: (id) => adapter.get(`/staff/staffs/${id}/edit`),
  update: (id, staff) => adapter.patch(`/staff/staffs/${id}`, { staff }),
  reset_password: (id) => adapter.patch(`/staff/staffs/${id}/reset_password`),
};

const organisations = {
  create: (organisation) => adapter.post('/staff/organisations', { organisation }),
  index: (props) => adapter.get('/staff/organisations?' + qs.stringify(props)),
  destroy: (id) => adapter.delete(`/staff/organisations/${id}`),
};

const interactions = {
  create: (interaction) => adapter.post('/staff/interactions', { interaction }),
};

const equipments = {
  create: (organisationId, equipment) => adapter.post(`/staff/organisations/${organisationId}/equipments`, { equipment }),
  validate: (organisationId, equipment) => adapter.post(`/staff/organisations/${organisationId}/equipments/validate`, { equipment }),
};

export default {
  clients,
  staffs,
  organisations,
  interactions,
  equipments
};
