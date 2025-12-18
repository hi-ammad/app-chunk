/**
 *  Represents a user's favourite stays in the system.
 *  @interface IFavourite
 *  @property {Types.ObjectId} id - Unique identifier for the favourite item.
 *  @property {Types.ObjectId} user - ID of the user who created the favourite.
 *  @property {Types.ObjectId} stay - ID of the listing that is favourited.
 *  @extends {ITimeStamp} - Inherits timestamp properties for created and updated dates.
 */
interface IUserFavStay extends ITimeStamp {
  id: Types.ObjectId; // Unique identifier for the favourite
  user: Types.ObjectId; // ID of the user who created the favourite
  stay: Types.ObjectId; // ID of the listing that is favourited
}
