/**
 * Interface representing a comment on a squawk.
 * @interface ISquawkComment
 * @extends {ITimeStamp}
 * @property {Types.ObjectId} user - Reference to the user who created the comment.
 * @property {Types.ObjectId} squawk - Reference to the squawk on which the comment is made.
 * @property {string} comment - The content of the comment.
 * @property {number} status - Status of the comment (0: Inactive, 1: Active, 2: Blocked, 3: Deleted).
 */
interface ISquawkComment extends ITimeStamp {
  id: Types.ObjectId; // Reference to the document
  user: Types.ObjectId; // Reference to the user who created the comment
  squawk: Types.ObjectId; // Reference to the squawk on which the comment is made
  comment: string; // The content of the comment
  status: number; // Status of the comment (0: Inactive, 1: Active, 2: Blocked, 3: Deleted)
}
