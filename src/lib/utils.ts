import { clsx, type ClassValue } from 'clsx';
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
