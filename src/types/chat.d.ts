/**
 * Chat interface definition
 * This interface represents a chat object in the system.
 * It includes properties for the chat ID, participants, admin, booking,
 * status, and timestamps for creation and updates.
 * @interface IChat
 * @property {Types.ObjectId} id - Unique identifier for the chat.
 * @property {Types.ObjectId} participent_1 - ID of the first participant in
 * the chat.
 * @property {Types.ObjectId} participent_2 - ID of the second participant in
 * the chat.
 * @property {Types.ObjectId} admin - ID of the admin managing the chat.
 * @property {Types.ObjectId} booking - ID of the booking associated with the
 * chat.
 * @property {'active' | 'archived'} status - Status of the chat, indicating
 * whether it is currently active or archived.
  */
interface IChat extends ITimeStamp {
  id: Types.ObjectId;
  participent_1: Types.ObjectId;
  participent_2: Types.ObjectId;
  admin: Types.ObjectId;
  booking: Types.ObjectId;
  status: 'active' | 'archived';
}
