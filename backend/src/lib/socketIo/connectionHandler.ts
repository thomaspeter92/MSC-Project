import { Server } from "socket.io"
import firebaseService from "../firebase/firebaseService"
import ErrorResponse from "../../utils/errorResponse"
import userDb from "../../db/userDb"
import messagesDb from "../../db/messagesDb"

export const initSocketServer = (httpServer: any) => {
  // Init Scoket.io for the chat feature
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    }
  })

  // Authenticate users on initial handshake based on bearer token
  io.use(async (socket: any, next) => {
    const token = socket.handshake.auth.token
    try {
      const fbUser = await firebaseService.verifyToken(token)
      const dbUser = await userDb.getUserByEmail(fbUser.email as string)
      socket.user = dbUser;
      next()
    } catch (error) {
      next(new ErrorResponse(401, 1, 'Unauthorsied'))
    }
  })

  // Socket.IO connection handler
  io.on('connection', async (socket: any) => {
    // Automatically join user to their conversation rooms
    try {
      const conversations = await messagesDb.getConversationsByUserId(socket.user.id);
      conversations.forEach((conv: any) => {
        socket.join(conv.id.toString()); // Ensure room ID is a string
      });
    } catch (error) {
      console.error('Error joining conversation rooms:', error);
    }


    socket.on('join room', (roomId: number) => {
      socket.join(roomId)
    })

    // Example: Listen for chat messages
    socket.on('chat message', (msg: string) => {
      console.log('message: ' + msg);
      // You can emit back to all clients, specific clients, or rooms
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

}

// 1 - message starts between two users
// 2 - entry is made into the Conversations table
// 3 - message is saved into the Messages table along with the conversation_id.
