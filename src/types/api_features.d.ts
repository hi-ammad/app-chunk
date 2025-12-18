import { Query } from "mongoose";

/**
 *  INFO: An interface representing a query string object where each key maps to a query parameter value.
 */
export interface QueryString {
  [key: string]: any;
}

/**
 * An interface representing the features for handling API queries such as filtering, sorting, field limiting,
 * pagination, and population of related data.
 */
class IAPIFeatures {
  queryString: QueryString;
  query: Query<any, any>;
  /**
   *  INFO: Creates an instance of IAPIFeatures.
   * @param query - The Mongoose query object.
   * @param queryString - An object containing query parameters.
   */
  constructor(query: Query<any, any>, queryString: QueryString);

  /**
   *  INFO: Filters the query based on the query string.
   * @returns The instance of the IAPIFeatures for chaining.
   */
  filter(): this;

  /**
   *  INFO: Sorts the query based on the query string.
   * @returns The instance of the IAPIFeatures for chaining.
   */
  sort(): this;

  /**
   *  INFO: Limits the fields of the documents returned by the query.
   * @returns The instance of the IAPIFeatures for chaining.
   */
  limitFields(): this;

  /**
   *  INFO: Paginates the query based on the query string.
   * @returns The instance of the IAPIFeatures for chaining.
   */
  paginate(): this;

  /**
   *  INFO: Populates the query with related documents based on the query string.
   * @returns The instance of the IAPIFeatures for chaining.
   */
  populate(): this;
}

export default IAPIFeatures;

/**
 * A class that implements various API features for a Mongoose query.
 */
class IAPIFeatures implements IIAPIFeatures {
  queryString: QueryString;
  query: Query<any, any>;

  /**
   * Creates an instance of IAPIFeatures.
   * @param query - The Mongoose query object.
   * @param queryString - An object containing query parameters.
   */
  constructor(query: Query<any, any>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Populates the query with related documents based on the query string.
   * @returns The instance of the IAPIFeatures for chaining.
   */
  populate(): this {
    // Implement population logic here
    return this;
  }
}

export default IAPIFeatures;
