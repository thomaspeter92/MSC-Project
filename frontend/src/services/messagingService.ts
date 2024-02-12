import api from "./api";


export const getAllMessages = async () => {
  return api.get('/messages/getMessages')
}

export const getConversationById = async (id: number) => {
  return api.post('/messages/getConversationById', { conversation_id: id })
}

export const sendMessage = async (body: { recipient_id: number, content: string }) => {
  return api.post('/messages/sendMessage', body)
}