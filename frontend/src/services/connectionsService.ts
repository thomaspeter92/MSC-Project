import api from "./api";


export const getConnections = () => {
  return api.get('/connections/getConnections')
}

export const registerConnection = () => {
}