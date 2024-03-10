import io from 'socket.io-client';

type MessageHandler = (message: string) => void;

class SocketEventManager {
  private socket: ReturnType<typeof io> | null = null; // More accurate typing
  private messageHandlers: MessageHandler[] = [];

  constructor() {

  }

  async initSocket(token: string) {
    console.log('INIT SOCKETS');
    this.socket = io('http://localhost:8080', {
      auth: {
        token: token, // Use the token directly
      },
    });

    this.socket.on('connect_error', (err: any) => {
      console.log('Socket.IO connect_error:', err.message);
    });

    // Register the global event listener within the async function after the socket is initialized
    this.socket.on('chat message', (message: string) => {
      this.messageHandlers.forEach((handler) => handler(message));
    });
  }

  subscribeToMessages(handler: MessageHandler) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  // Ensure joinConversationRoom doesn't reinitialize the socket with a new token
  joinConversationRoom(conversationId: string) {
    if (this.socket) {
      this.socket.emit('join room', conversationId);
    } else {
      console.error('Socket not initialized or token not set');
    }
  }

  sendMessage(conversationId: string, message: string) {
    if (this.socket) {
      // Modify to include conversationId when emitting a message
      this.socket.emit('chat message', { conversationId, message });
    } else {
      console.error('Socket not initialized');
    }
  }
}

export default new SocketEventManager();
