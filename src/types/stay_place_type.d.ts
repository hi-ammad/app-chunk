/**
 * IStayPlaceType interface
 * @interface IStayPlaceType
 * @property {string} name - The name of the stay space type.
 * @property {Types.ObjectId} user - The ID of the user who created the stay surface type.
 * @property {boolean} is_active - Indicates whether the stay surface type is active.
 * @extends {ITimeStamp} - Inherits timestamp properties for created and updated dates.
 * */
interface IStayPlaceType extends ITimeStamp {
  name: string;
  user: Types.ObjectId;
  is_active: boolean;
}
