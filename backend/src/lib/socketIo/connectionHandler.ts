import { Server } from "socket.io";
import firebaseService from "../firebase/firebaseService";
import ErrorResponse from "../../utils/errorResponse";
import userDb from "../../db/userDb";
import messagesDb from "../../db/messagesDb";

export const initSocketServer = (httpServer: any) => {
  // Init Scoket.io for the chat feature
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Authenticate users on initial handshake based on bearer token
  io.use(async (socket: any, next) => {
    const token = socket.handshake.auth.token;
    try {
      const fbUser = await firebaseService.verifyToken(token);
      const dbUser = await userDb.getUserByEmail(fbUser.email as string);
      socket.user = dbUser;
      next();
    } catch (error) {
      next(new ErrorResponse(401, 1, "Unauthorsied"));
    }
  });

  // SOCKET CONNECTION HANDLER
  // Automatically join user to their conversation rooms
  io.on("connection", async (socket: any) => {
    try {
      const conversations = await messagesDb.getConversationsByUserId(
        socket.user.id
      );
      conversations.forEach((conv: any) => {
        socket.join(conv.id.toString()); // Ensure room ID is a string
      });
    } catch (error) {
      console.error("Error joining conversation rooms:", error);
    }

    socket.on("join room", (roomId: number) => {
      socket.join(roomId);
    });

    // MESSAGE HANDLER
    socket.on(
      "chat message",
      async ({
        message,
        conversationId,
      }: {
        message: string;
        conversationId: number;
      }) => {
        io.to(conversationId + "").emit("chat message", {
          content: message,
          sender_id: socket.user.id,
          timestamp: new Date(),
          id: conversationId,
        });
        await messagesDb.createMessage({
          conversation_id: conversationId,
          sender_id: socket.user.id,
          content: message,
        });
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
