import api from './api';

export const getConnections = () => {
  return api.get('/connections/getConnections');
};

export const registerConnection = (body: { id: number; status: string }) => {
  return api.post('/connections/makeConnection', body);
};

export const getRecentConnections = () => {
  return api.get('/connections/getRecentConnections');
};
