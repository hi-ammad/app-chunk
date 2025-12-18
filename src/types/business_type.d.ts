/**
* Interface representing a business type in the system.
* @interface IBusinessType
* @extends {ITimeStamp}
* @property {string} name - The name of the feature.
* @property {boolean} is_active - Indicates whether the feature is currently active.
* @property {Types.ObjectId} user - Reference to the user who created or modified the business type.
*/
interface IBusinessType extends ITimeStamp {
  user: Types.ObjectId; // Reference to the user who created or modified the feature
  name: string; // Name of the feature
  is_active: boolean; // Whether the feature is active or not
}
