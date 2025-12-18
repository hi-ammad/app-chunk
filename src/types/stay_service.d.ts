/**
*  Stay Service Type
*  @interface IStayServiceType
*  @property {string} name - Name of the stay service type.
*  @property {Types.ObjectId} user - User ID associated with the stay service type.
*  @property {Types.ObjectId} [parent] - Optional parent ID for hierarchical relationships.
*  @property {boolean} is_active - Indicates if the stay service type is active.
*  @extends {ITimeStamp} - Inherits timestamp properties for created and updated dates.
*/
interface IStayServiceType extends ITimeStamp {
  name: string;
  user: Types.ObjectId;
  parent?: Types.ObjectId;
  is_active: boolean;
}

