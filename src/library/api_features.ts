import { Query } from "mongoose";
import IAPIFeatures, { type QueryString } from "@/types/api_features";

class APIFeatures implements IAPIFeatures {
  queryString: QueryString;
  query: Query<any, any>;

  constructor(query: Query<any, any>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /*  INFO: FILTER - FILTERS_THE_QUERY_BASED_ON_THE_QUERY_STRING. */
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "populate"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //  INFO: 1B) ADVANCED_FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (match) => `$${match}`,
    );
    const parsedQuery = JSON.parse(queryStr);
    const finalQuery: Record<string, any> = {};

    // Step 2: Handle $or and $and manually
    // ?state[or]= ["value1", "value2"]
    // ?state[and]= ["value1", "value2"]
    for (const key in parsedQuery) {
      const value = parsedQuery[key];

      if (typeof value === "object" && (value.or || value.and)) {
        const logicKey = value.or ? "or" : "and";
        let logicValues;

        try {
          logicValues = JSON.parse(value[logicKey]);
        } catch (err) {
          throw new Error(`Invalid JSON format in ${logicKey}: ${value[logicKey]}`);
        }

        const mongoLogicKey = `$${logicKey}`;
        finalQuery[mongoLogicKey] = logicValues.map((val: any) => ({
          [key]: val,
        }));
      } else {
        finalQuery[key] = value;
      }
    }

    this.query = this.query.find(finalQuery);
    return this;
  }

  /*  INFO: SORT - SORT_THE_QUERY_BASED_ON_THE_QUERY_STRING. */
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  /*  INFO: LIMIT - LIMIT_THE_QUERY_BASED_ON_THE_QUERY_STRING. */
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  /*  INFO: PAGINATE - PAGINATE_THE_QUERY_BASED_ON_THE_QUERY_STRING. */
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  /*  INFO: POPULATE - POPULATE_THE_QUERY,_BASED_ON_THE_QUERY_STRING. */
  populate() {
    this.query.populate(JSON.parse(this.queryString.populate as string));
    return this;
  }
}

export default APIFeatures;

