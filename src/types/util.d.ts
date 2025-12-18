/**
 * Represents a timestamp object with creation and update times.
 */
declare interface ITimeStamp {
  /**
   * The timestamp indicating when the object was created.
   */
  createdAt: string;

  /**
   * The timestamp indicating when the object was last updated.
   */
  updatedAt: string;
}

/**
 * Options for the joi makeSchemaOptional function.
 */
interface MakeSchemaOptionalOptions {
  excludeFields?: string[];
}
