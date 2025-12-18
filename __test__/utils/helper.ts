import App from '@/app';
import request from 'supertest';

export const app = request(App.instance.app)

export const getImage = (imgName = 'image.png') => `${import.meta.dir}/assets/${imgName}`;

/*
 * applyFieldsFromObject
 * Recursively applies fields from a given object to a request object.
 * */
export const applyFieldsFromObject = (request: any, data: any, parentKey = '') => {
  for (const key in data) {
    if (!data.hasOwnProperty(key)) continue;

    const value = data[key];
    const fieldKey = parentKey
      ? Array.isArray(data)
        ? `${parentKey}[${key}]`
        : `${parentKey}[${key}]`
      : key;

    if (
      value !== null &&
      typeof value === 'object' &&
      !(value instanceof File || value instanceof Buffer || value.path) // Don't recurse into file/stream objects
    ) {
      applyFieldsFromObject(request, value, fieldKey);
    } else {
      request.field(fieldKey, String(value));
    }
  }

  return request;
}

type Mismatch = {
  path: string;
  type: 'missing' | 'value_mismatch' | 'type_mismatch';
  sourceValue?: any;
  targetValue?: any;
}

function arraysEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}

export const compareTargetAgainstSource = (
  source: Record<string, any>,
  target: Record<string, any>,
  parentPath: string = ''
): Mismatch[] => {
  const mismatches: Mismatch[] = [];

  if (target._id) {
    target.id = target._id; // Ensure _id is treated as id for comparison
    delete target._id; // Remove _id to avoid confusion
  }


  for (const key in target) {
    const fullPath = parentPath ? `${parentPath}.${key}` : key;

    if (!(key in source)) {
      mismatches.push({
        path: fullPath,
        type: 'missing',
        targetValue: target[key],
      });
      continue;
    }

    const sourceVal = source[key];
    const targetVal = target[key];

    const bothArrays = Array.isArray(sourceVal) && Array.isArray(targetVal);
    const bothObjects =
      typeof sourceVal === 'object' &&
      sourceVal !== null &&
      typeof targetVal === 'object' &&
      targetVal !== null &&
      !bothArrays;

    if (bothArrays) {
      if (!arraysEqual(sourceVal, targetVal)) {
        mismatches.push({
          path: fullPath,
          type: 'value_mismatch',
          sourceValue: sourceVal,
          targetValue: targetVal,
        });
      }
    } else if (bothObjects) {
      mismatches.push(...compareTargetAgainstSource(sourceVal, targetVal, fullPath));
    } else if (typeof sourceVal !== typeof targetVal) {
      mismatches.push({
        path: fullPath,
        type: 'type_mismatch',
        sourceValue: sourceVal,
        targetValue: targetVal,
      });
    } else if (sourceVal !== targetVal) {
      mismatches.push({
        path: fullPath,
        type: 'value_mismatch',
        sourceValue: sourceVal,
        targetValue: targetVal,
      });
    }
  }

  return mismatches;
}

export function hasOnlyKeys(obj: Map<string, any>, allowedKeys: string[]): boolean {
  const objKeys = Object.keys(obj);
  return objKeys.every(key => allowedKeys.includes(key)) && allowedKeys.every(key => objKeys.includes(key));
}
