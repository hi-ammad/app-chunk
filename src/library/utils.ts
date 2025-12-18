import { Model, Types } from "mongoose";
import { Constant } from "@/constants";
import jwt from "jsonwebtoken";
import Joi, { type AnySchema } from "joi";
import RedisCache from "./redis";
import { User } from "@/modal";
import { s3upload } from "./s3";
import { multerUpload } from "./multer";


/**
 * Recursively makes fields in a Joi schema optional.
 * @param schema - Joi schema object or field-level schema.
 * @param options - Options to exclude certain fields from becoming optional.
 * @returns New Joi schema with optional fields.
 */
export function makeSchemaJoiOptional<T extends AnySchema | Record<string, any>>(
  schema: T,
  options: MakeSchemaOptionalOptions = {}
): any {
  const { excludeFields = [] } = options;

  // If it's a root object schema (like createBusinessSchema), handle as object
  if (typeof schema === 'object' && !('validate' in schema)) {
    const result: Record<string, any> = {};
    for (const key in schema) {
      if (excludeFields.includes(key)) {
        result[key] = schema[key]; // leave as-is
      } else {
        // @ts-ignore
        result[key] = makeSchemaJoiOptional(schema[key], options);
      }
    }
    return Joi.object(result).optional();
  }

  // If it's an array schema
  const schemaDescription = (schema as AnySchema).describe();
  if (schemaDescription.type === 'array') {
    const itemSchemas = (schema as any)._inner?.items || (schema as any)._items;
    if (itemSchemas?.length > 0) {
      const itemSchema = makeSchemaJoiOptional(itemSchemas[0], options);
      return Joi.array().items(itemSchema).optional();
    }
  }

  // If it's a nested object schema
  if (schemaDescription.type === 'object') {
    const keys: Record<string, AnySchema> = {};
    const innerKeys = (schema as any)._ids?._byKey || (schema as any)._inner?.children;

    if (innerKeys) {
      for (const key in innerKeys) {
        if (excludeFields.includes(key)) continue;
        const childSchema = (schema as any).extract
          ? (schema as any).extract(key)
          : innerKeys[key]?.schema || innerKeys[key]?.schema;
        keys[key] = makeSchemaJoiOptional(childSchema, options);
      }
    }

    return Joi.object(keys).optional();
  }

  // Primitive schemas
  return (schema as AnySchema).optional();
}


/**
 * Mongoose: Flatten the body to allow dot-notation update,
 * including nested fields and arrays like "addresses.0.state"
 */
export const flatten = (obj: any, prefix = ''): any => {
  return Object.keys(obj).reduce((acc: any, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flatten(obj[k], pre + k));
    } else if (Array.isArray(obj[k])) {
      obj[k].forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          Object.assign(acc, flatten(item, `${pre}${k}.${index}`));
        } else {
          acc[`${pre}${k}.${index}`] = item;
        }
      });
    } else {
      acc[`${pre}${k}`] = obj[k];
    }
    return acc;
  }, {});
};

/**
 * Uploads Media Files Using Either Multer (Local) Or S3 Based On The Environment.
 * Local - Public Directory: `public/media`
 */
export const mediaUpload = process.env.NODE_ENV === "production" ? s3upload : multerUpload;

// Helper to safely get nested value from an object by a dot-separated string
const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

const getFields = (): string[] => {
  return [
    "first_name",
    "middle_name",
    "last_name",
    "email",
    "display_name",
    "native_language",
    "phone",
    "mailing_address.address",
    "mailing_address.city",
    "mailing_address.state",
    "mailing_address.zip_code",
    "mailing_address.country",
    "contact.name",
    "contact.relationship",
    "contact.email",
    "contact.phone",
    "airmen_certificate_front",
    "airmen_certificate_back",
    "driving_license_front",
    "driving_license_back",
    "photo",
    "bio",
  ]
}


export const getUserCompleteInPercentage = (user: any) => {
  const fieldsKeys = getFields()

  const fieldWeight = (100 / fieldsKeys.length)
  let completePercentage = 0;
  const completedFields: string[] = [];
  const remainingFields: string[] = [];

  for (const field of fieldsKeys) {
    const value = getValueByPath(user, field);

    if (value !== undefined && value !== null && value !== '') {
      // @ts-ignore
      completePercentage += fieldWeight;
      completedFields.push(field);
    } else {
      remainingFields.push(field);
    }
  }

  const totalFields = fieldsKeys.length;
  const completedFieldsLength = completedFields.length;

  return {
    percentage: Math.round(completePercentage),
    complete: completedFieldsLength,
    remaining: totalFields - completedFieldsLength,
    completed_fields: completedFields,
    remaining_fields: remainingFields,
  };
};

/**
 * Constructs a Route String With The Specified Version Of The API.
 * @param {string} route - The Route To Be Appended To The API Version.
 * @returns {string} The Complete Route String With The API Version Appended.
 * @example
 * ```typescript
 * const versionedRoute = routeWdVersion("users");
 * // Returns: "/api/v1/users"
 * ```
 */
export const routeWdVersion = (route: string): string =>
  `/api/${Constant.instance.server.apiVersion}/${route}`;

/**
 * Generates Access And Refresh Tokens Based On The Provided Payload.
 * @param {Object} payload - The Payload Containing User ID And Token Type.
 * @param {Types.ObjectId} payload.id - The Unique Identifier Of The User.
 * @param {number} payload.type - The Type Of Token To Be Generated, Must Be 0 For Normal & 1 For ForgetPasswordToken
 * @returns {Object} An Object Containing The AccessToken And RefreshToken.
 * @throws {Error} Throws An Error If Required JWT Secrets Or Expiration Values Are Missing.
 * @example
 * ```typescript
 * const payload = { id: new Types.ObjectId(), type: 1 };
 * const tokens = getToken(payload);
 * // Returns: { accessToken: '...', refreshToken: '...' }
 * ```
 */
export const getToken = (payload: {
  id: Types.ObjectId;
  type: number;
}): { accessToken: string; refreshToken: string } => {
  const { accessSecret, accessExpire, refreshSecret, refreshExpire } =
    Constant.instance.jwt;

  const accessToken = jwt.sign(payload, accessSecret!, {
    // expiresIn: accessExpire,
  });
  const refreshToken = jwt.sign(payload, refreshSecret!, {
    // expiresIn: refreshExpire,
  });

  return { accessToken, refreshToken };
};

/**
 * Validates An Object Against The Provided Joi Schema.
 * @param {Joi.ObjectSchema} joiSchema - The Joi Schema To Validate Against.
 * @param {any} body - The Object To Be Validated.
 * @returns {Joi.ValidationResult} The Result Of The Validation, Including Any Validation Errors.
 * @example
 * ```typescript
 *   const schema = Joi.object({
 *   username: Joi.string().alphanum().min(3).max(30).required(),
 *   password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
 * });
 * const requestBody = { username: 'example', password: 'password123' };
 * const validationResult = joiHelper(schema, requestBody);
 * // Returns: { error: null, value: { username: 'example', password: 'password123' } }
 * ```
 */
export const joiHelper = (
  joiSchema: Joi.ObjectSchema,
  body: any,
): { error: any; value: any } => {
  return joiSchema.validate(body, { abortEarly: false });
};

/**
 * Invalidates cache entries associated with a user, optionally invalidating photo URLs as well.
 * @param {string} userId - The ID of the user whose cache entries should be invalidated.
 * @param {boolean} [invalidPhotoUrl=true] - Whether to invalidate photo URLs cache entries.
 * @param {Model<any>} [model=User] - The Mongoose model associated with the cache entries. Defaults to the User model.
 * @returns {Promise<void>} A Promise that resolves when the cache invalidation is complete.
 * @example
 * ```typescript
 * await invalidateUserCache('1234567890');
 * // Invalidates cache entries associated with the user with ID '1234567890'.
 *
 * await invalidateUserCache('1234567890', true, CustomUserModel);
 * // Invalidates cache entries associated with the user with ID '1234567890' using a custom user model.
 * ```
 */
export const invalidateUserCache = async (
  userId: string,
  invalidPhotoUrl: boolean = true,
  model: Model<any> = User,
): Promise<undefined> => {
  const client = RedisCache.instance.client;

  /** 1) Getting All <MODAL> Keys */
  let extractedKeys = await client.keys(`*${model.modelName}*`);

  /** 2) Filter Keys - <invalidate all __ getAllDocs & this specific Doc>*/
  extractedKeys = extractedKeys.filter((key) => {
    const parsedKey = JSON.parse(key);
    /**
     * It Will Invalidate:
     * 1) Current User Cache - key: {collection:'User','id':<current user id>}
     * 2) All User Cache - key: {collection:'User', ...* }
     */
    if (invalidPhotoUrl) return parsedKey.id === userId || !parsedKey.id;

    /**
     * It Will Invalidate:
     * 1) Current User Cache - key: {collection:'User','id':<current user id>}
     * 2) All User Cache - key: {collection:'User', ...* }
     * 3) Remember It Will Not Invalidate GetMePhoto & GetMeCoverPhoto
     * -- key: {collection:'User','id':<current user id>,select:'photo/cover_photo'}
     */
    return (
      (parsedKey.id === userId || !parsedKey.id) &&
      !parsedKey.photo &&
      !parsedKey.cover_photo
    );
  });

  /** delete cache data */
  if (extractedKeys.length > 0) await client.del(extractedKeys);
};
