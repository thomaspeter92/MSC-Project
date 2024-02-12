import io from 'socket.io-client';
import { getUserToken } from "./firebaseService";


type MessageHandler = (message: string) => void;

class SocketEventManager {
  private socket: any;
  private messageHandlers: MessageHandler[] = [];

  async initSocket() {
    const token = await getUserToken(); // Ensure this is awaited before proceeding
    console.log(token)
    this.socket = io('http://localhost:8080', {
      auth: {
        token: token, // Use the token directly
      },
    });

    this.socket.on('connect_error', (err: any) => {
      console.log('Socket.IO connect_error:', err.message); // Log connection errors
    });

    // Register the global event listener within the async function after the socket is initialized
    this.socket.on('chat message', (message: string) => {
      this.messageHandlers.forEach(handler => handler(message));
    });
  }
  // Adjust the subscribeToMessages and sendMessage methods to use this.socket
  subscribeToMessages(handler: MessageHandler) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  sendMessage(message: string) {
    if (this.socket) {
      this.socket.emit('chat message', message);
    } else {
      console.error('Socket not initialized');
    }
  }
}

// Export an instance of the manager
export default SocketEventManager;
