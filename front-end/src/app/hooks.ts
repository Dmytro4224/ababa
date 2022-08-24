import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {IFormData, setFormErrors} from "../helpers/misc";
import React, {useEffect, useState} from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useResponse = <T extends IFormData>(initialState: T, submittedData: any) => {
  const [formData, setFormData] = useState(initialState);

  const setInvalid = (name: string, isValid: boolean) => {
    const invalids = formData.invalidFields;
    const index = invalids.indexOf(name);
    if(index !== -1){
      invalids.splice(index, 1);
    }

    if(!isValid){
      invalids.push(name);
    }

    setFormData({
      ...formData,
      invalidFields: invalids
    })
  }

  useEffect(() => {
    if(submittedData && submittedData.statusCode !== 200){
      setFormData({
        ...formData,
        error: true
      })
    }
  }, [submittedData])

  const onInputChange = (name: string) => (e: React.ChangeEvent<any>) => setFormData({ ...formData, [name]: e.target.value });
  const onInputFocus = (name: string) => (e: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      error: false,
      invalidFields: setFormErrors(formData.invalidFields, name, true)
    })
  };

  return { formData, setFormData, setInvalid, onInputChange, onInputFocus };
}
