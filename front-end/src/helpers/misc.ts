import React from "react";

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const digestMessage = async (message: string) => {
  const data = new TextEncoder().encode(message);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  const bytes = Array.from(new Uint8Array(buffer));
  const hex = bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  return hex;
}

export const cls = (...args: string[]) => {
  return args.join(' ');
}

export interface IFormData {
  invalidFields: Array<string>;
}

export const setFormErrors = <T extends IFormData>(invalidFields: Array<string>,name: string, isValid: boolean) => {
  const invalids = invalidFields;
  const index = invalids.indexOf(name);
  if(index !== -1){
    invalids.splice(index, 1);
  }

  if(!isValid){
    invalids.push(name);
  }

  return invalids;
}

export const toggleErrorClass = (invalidFields: Array<string>, name: string, className: string) => {
  const index = invalidFields.indexOf(name);

  return index !== -1 ? className : '';
}

export const isNullOrEmpty = (value: any) => {
  if(value === undefined) return true;
  if(value === null) return true;
  if(typeof value === 'string' && value.length === 0) return true;

  return false;
}

export const setImage = (event: any, image: any) => {
  if(event.target){
    event.target.src = image;
  }
}
