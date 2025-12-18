/**
 * ICountry Interface
 * It includes properties for user association, name, code, and active status.
 * @property {Types.ObjectId} user - The ID of the user associated with the country.
 * @property {string} name - The name of the country.
 * @property {string} code - The unique code for the country.
 * @property {boolean} is_active - Indicates if the country is active.
 * @extends {ITimeStamp} - Inherits timestamp properties for creation and update times.
 */
interface ICountry extends ITimeStamp {
  user: Types.ObjectId;
  name: string;
  code: string;
  is_active: boolean;
}

