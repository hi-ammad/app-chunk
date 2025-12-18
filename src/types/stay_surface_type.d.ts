/**
 * StaySurfaceType interface
 * @interface IStaySurfaceType
 * @property {string} name - The name of the stay surface type.
 * @property {Types.ObjectId} user - The ID of the user who created the stay surface type.
 * @property {boolean} is_active - Indicates whether the stay surface type is active.
 * */
interface IStaySurfaceType extends ITimeStamp {
  name: string;
  user: Types.ObjectId;
  is_active: boolean;
}
