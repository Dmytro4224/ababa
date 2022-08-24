import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginResponse } from '../../redux/api/authApi';
import styles from '../../styles/section.module.css';
import formStyles from '../../styles/form.module.css';
import {cls, IFormData, setFormErrors, setInvalidField, toggleErrorClass} from "../../helpers/misc";
import {useResponse} from "../../app/hooks";
import {goToRegister} from "../../app/navigations";

interface ILogin {
  onLogin: (data: ILoginFormData) => void;
  isSubmitting: boolean;
  submittedData: ILoginResponse | undefined;
}

export interface ILoginFormData extends IFormData{
  login: string;
  password: string;
  error: boolean;
}

const initialState: ILoginFormData = {
  login: '',
  password: '',
  error: false,
  invalidFields: []
}

export const LoginView = ({ onLogin, isSubmitting, submittedData }: ILogin) => {
  const { formData, setInvalid, onInputChange, onInputFocus } = useResponse(initialState, submittedData);

  const navigate = useNavigate();

  const checkValidate = (formData: ILoginFormData) => {
    setInvalid('login', formData.login.length !== 0)
    setInvalid('password', formData.password.length !== 0)

    return formData.invalidFields.length === 0;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(checkValidate(formData)){
      onLogin({ ...formData });
    }
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Sign In</h3>
      <form onSubmit={onSubmit}>
        <div className={cls(formStyles.field, toggleErrorClass(formData.invalidFields,'login', formStyles.isErrorField ))}>
          <label className={formStyles.label} htmlFor="authLogin">Your login</label>
          <input
            type="text"
            id="authLogin"
            className={cls(formStyles.input)}
            value={formData.login}
            onChange={onInputChange('login')}
            onFocus={onInputFocus('login')}
          />
          <span className={formStyles.subText}>*Incorrect login</span>
        </div>
        <div className={cls(formStyles.field, toggleErrorClass(formData.invalidFields,'password', formStyles.isErrorField ))}>
          <label className={formStyles.label} htmlFor="authPassword">Your password</label>
          <input
            type="password"
            id="authPassword"
            className={cls(formStyles.input)}
            value={formData.password}
            onChange={onInputChange('password')}
            onFocus={onInputFocus('password')}
          />
          <span className={formStyles.subText}>*Incorrect password</span>
        </div>
        <div className={cls(formStyles.field)}>
          <div className={formStyles.alert}>{formData.error ? <span className={formStyles.subText}>*User not found</span> : '' }</div>
        </div>
        <div className={`${formStyles.field} ta-c`}>
          <button type="submit" disabled={isSubmitting} className={`${formStyles.btn} ${formStyles.btnPrimary}`}>
            Login
          </button>
          <br />
          or
          <br />
          <button
            type="button"
            className={`${formStyles.btn} ${formStyles.btnRed}`}
            onClick={goToRegister(navigate)}
          >
            Create account »
          </button>
        </div>
      </form>
    </section>
  )
}
