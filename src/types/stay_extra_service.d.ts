/**
 * Stay Extra Service Interface
 * It includes properties for the service's ID, price, quantity, associated service type, and the stay it belongs to.
 * It also extends a timestamp interface to include created and updated timestamps.
 * @interface IStayExtraService
 * @property {Types.ObjectId} id - Unique identifier for the stay extra service.
 * @property {number} price - Price of the extra service.
 * @property {number} quantity - Quantity of the extra service.
 * @property {string} name - Name or description of the extra service.
 * @property {Types.ObjectId} service_type - Reference to the service type associated with the extra service.
 * @extends ITimeStamp
 */
interface IStayExtraService extends ITimeStamp {
  id: Types.ObjectId;
  user: Types.ObjectId;
  price: number;
  quantity: number;
  name: string;
  description: string;
  service_type: Types.ObjectId;
  stay: Types.ObjectId;
}
