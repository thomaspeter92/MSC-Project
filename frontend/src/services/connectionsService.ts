import api from './api';

export const getConnections = () => {
  return api.get('/connections/getConnections');
};

export const registerConnection = (body: { id: number; status: string }) => {
  return api.post('/connections/makeConnection', body);
};

export const getConnectionsList = () => {
  const params = new URLSearchParams();
  params.append('limit', '9');
  return api.get('/connections/getConnectionsList?' + params);
};

export const getConnectionsListAll = () => {
  const params = new URLSearchParams();
  params.append('limit', '1000000');
  return api.get('/connections/getConnectionsList?' + params);
};
