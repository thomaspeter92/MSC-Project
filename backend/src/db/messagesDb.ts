import Db from "./db";

class MessagesDb extends Db {

  checkCoversationExists = async (data: { sender_id: number, recipient_id: number }) => {
    let sql = `SELECT id FROM "Conversations" WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1);`
    let result = await this.query(sql, [data.sender_id, data.recipient_id]);
    return result.rows[0]?.id || null;
  }

  createConversation = async (data: { sender_id: number, recipient_id: number }) => {
    let sql = `INSERT INTO "Conversations" (user1_id, user2_id) VALUES ($1, $2) RETURNING id;`
    let result = await this.query(sql, [data.sender_id, data.recipient_id]);
    return result.rows[0]?.id || null;
  }

  createMessage = async (data: { conversation_id: number, sender_id: number, content: string }) => {
    const sql = `INSERT INTO "Messages" (conversation_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *;`;
    let result = await this.query(sql, [data.conversation_id, data.sender_id, data.content]);
    return result.rows[0] || null;
  }


  getAllConversations = async (data: { user_id: number }) => {
    const sql = `
    SELECT c.id, c.created_at, c.updated_at, 
      CASE 
          WHEN u1.id = $1 THEN u2.first_name ELSE u1.first_name 
      END as name,
      CASE 
          WHEN u1.id = $1 THEN u2.picture ELSE u1.picture 
      END as picture,
      m.content as last_message_content,
      m.timestamp as last_message_timestamp
    FROM "Conversations" c
    LEFT JOIN "User" u1 ON c.user1_id = u1.id
    LEFT JOIN "User" u2 ON c.user2_id = u2.id
    LEFT JOIN LATERAL (
        SELECT content, timestamp
        FROM "Messages" 
        WHERE conversation_id = c.id
        ORDER BY timestamp DESC
        LIMIT 1
    ) m ON true
    WHERE c.user1_id = $1 OR c.user2_id = $1
    ORDER BY c.updated_at DESC;
    `
    let result = await this.query(sql, [data.user_id])
    return result.rows || null
  }

  getConversationById = async (conversation_id: number) => {
    let sql = `SELECT * FROM "Conversations" WHERE id = $1;`
    let result = await this.query(sql, [conversation_id])
    return result.rows[0] || null
  }

  getWholeConversationById = async (conversation_id: number) => {
    let sql = `
    SELECT *
    FROM "Messages" 
    WHERE conversation_id = $1 
    ORDER BY timestamp;
    `
    let result = await this.query(sql, [conversation_id])
    return result.rows || null
  }

}

export default new MessagesDb();
