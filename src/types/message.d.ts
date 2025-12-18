/**
 * This file defines the types for chat messages in a messaging application.
 * It includes the interface for a chat message, which contains properties
 * such as the message ID, chat ID, sender ID, message content, and status.
 * @property {Types.ObjectId} id - Unique identifier for the chat message.
 * @property {Types.ObjectId} chat - ID of the chat to which the message belongs
 * @property {Types.ObjectId} sender - ID of the user who sent the message.
 * @property {string} message - The content of the chat message.
 * @property {'sent' | 'delivered' | 'read'} status - The status
 */
interface IMessage extends ITimeStamp {
  id: Types.ObjectId;
  chat: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
  status: 'sent' | 'delivered' | 'read';
}
