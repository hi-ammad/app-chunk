/**
*  INFO: Squawk Interface 
*
* @interface ISquawk
* @property {string} html - The HTML content of the squawk.
* @property {boolean} [is_active] - Indicates if the squawk is active or not. Defaults to true.
* @property {string} [title] - The title of the squawk.
* @property {string} [description] - A description of the squawk.
* @property {string[]} [tags] - An array of tags associated with the squawk.
* @property {string} [cover_image] - URL of the cover image for the squawk.
* @property {Types.ObjectId} user - Reference to the user who created the squawk.
* @property {Types.ObjectId} id - Unique identifier for the squawk.
* @extends ITimeStamp - Timestamp properties for created and updated times.
*/
interface ISquawk extends ITimeStamp {
  html: string;
  title?: string;
  description?: string;
  tags?: string[];
  cover_image?: string;
  user: Types.ObjectId;
  is_active: boolean;
  id: Types.ObjectId;
}

