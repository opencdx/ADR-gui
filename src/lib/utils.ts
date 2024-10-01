import { clsx, type ClassValue } from 'clsx';
import _ from "lodash";
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createNestedObject(fields: string[], value: any): object {
  if (fields.length === 0) {
    return value;
  }

  const [field, ...remaining] = fields;
  const nestedObject: any = {};
  nestedObject[field] = createNestedObject(remaining, value);

  return nestedObject;
}

export function successToast(message: string) {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2000,
    theme: 'colored',
    closeButton: false,
    icon: false,
    progressStyle: { background: '#095028' },
  });
}

export function errorToast(message: string) {
  toast.error(message, {
    position: 'top-right',
    autoClose: 2000,
    theme: 'colored',
    closeButton: false,
    icon: false,
  });
}

export function mergeWithEmptyObj(obj1: any, obj2: any): object {
  return _.mergeWith({}, obj1, obj2, function (objValue, srcValue) {
    // If srcValue is an empty object, replace objValue entirely
    if (_.isObject(srcValue) && _.isEmpty(srcValue)) {
      return srcValue;
    }
    // Otherwise, use default merging behavior
    return undefined;
  });
}
