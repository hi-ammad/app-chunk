/**
 * Airport data type definition.
 * This file defines the structure of an airport object
 * @interface IAirport
 * @extends ITimeStamp
 * @property {string} airport_identifier - Unique identifier for the airport.
 * @property {string} airport_name - Name of the airport.
 * @property {number} airport_use - Type of airport use (0: Public Use, 1: Private Use).
 * @property {string} [ctaf_unicom] - CTAF/UNICOM frequency.
 * @property {string} [dimension_feets] - Dimensions of the airport in feet.
 * @property {string} [dimension_meters] - Dimensions of the airport in meters.
 * @property {number} [elevation_feets] - Elevation of the airport in feet.
 * @property {number} [elevation_meters] - Elevation of the airport in meters.
 * @property {string} [fuel] - Type of fuel available at the airport.
 * @property {boolean} [lighting] - Whether the airport has lighting facilities.
 * @property {string} [operation_hours] - Operational hours of the airport.
 * @property {string} [orientation] - Orientation of the runways.
 * @property {string} [runway_condition] - Condition of the runways.
 * @property {string} [parking] - Parking facilities available at the airport.
 * @property {string} [pattern] - Traffic pattern information.
 * @property {string} [surface] - Surface type of the runways.
 * @property {string} [air_nav] - URI for additional information on the airport.
 * @property {string} [ground_transportation] - Ground transportation options available.
 *  @property {number} [distance_from_runway] - Distance from the runway, precision to two decimal places.
 *  @property {string} [additional_info] - Any additional information about the airport.
 *  @extends ITimeStamp - Inherits timestamp properties for creation and modification times.
 */
interface IAirport extends ITimeStamp {
  airport_identifier: string;
  airport_name: string;
  helicopter_allowed: boolean;
  stay: Types.ObjectId; // Reference to the stay object
  airport_use: number; // 0: Public Use, 1: Private Use
  ctaf_unicom?: string;
  dimension_feets?: string;
  dimension_meters?: string;
  elevation_feets?: number;
  elevation_meters?: number;
  fuel?: string;
  lighting?: boolean;
  operation_hours?: string;
  orientation?: string;
  runway_condition?: string;
  parking?: string;
  pattern?: string;
  surface?: string;
  air_nav?: string; // URI
  ground_transportation?: string;
  distance_from_runway?: number; // Precision to two decimal places
  additional_info?: string;
}
