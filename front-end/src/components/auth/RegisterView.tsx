import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IRegisterResponse } from '../../redux/api/authApi';
import styles from '../../styles/section.module.css';
import formStyles from '../../styles/form.module.css';
import {cls, IFormData, toggleErrorClass} from '../../helpers/misc';
import { goToLoginPage } from '../../app/navigations';
import {useResponse} from "../../app/hooks";

interface IRegisterView {
  onRegister: (data: IRegisterFormData) => void;
  isSubmitting: boolean;
  submittedData: IRegisterResponse | undefined;
}

export interface IRegisterFormData extends IFormData{
  login: string;
  password: string;
  name: string;
  error: boolean;
  lastName: string;
}

const initialState: IRegisterFormData = {
  login: '',
  password: '',
  name: '',
  lastName: '',
  error: false,
  invalidFields: []
}

export const RegisterView = ({ onRegister, isSubmitting, submittedData }: IRegisterView) => {

  const { formData, setInvalid, onInputChange, onInputFocus } = useResponse(initialState, submittedData);
  const navigate = useNavigate();

  const checkValidate = (formData: IRegisterFormData) => {
    setInvalid('name', formData.name.length !== 0);
    setInvalid('login', formData.login.length !== 0);
    setInvalid('password', formData.password.length !== 0);

    return formData.invalidFields.length === 0;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(checkValidate(formData)) {
      onRegister({...formData});
    }
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Create account</h3>
      <form onSubmit={onSubmit}>
        <div className={cls(formStyles.field, toggleErrorClass(formData.invalidFields,'name', formStyles.isErrorField ))}>
          <label className={formStyles.label} htmlFor="registerName">Your name</label>
          <input
            type="text"
            id="registerName"
            className={formStyles.input}
            maxLength={50}
            value={formData.name}
            onChange={onInputChange('name')}
            onFocus={onInputFocus('name')}
          />
          <span className={formStyles.subText}>*Incorrect name</span>
        </div>
        <div className={cls(formStyles.field, toggleErrorClass(formData.invalidFields,'login', formStyles.isErrorField ))}>
          <label className={formStyles.label} htmlFor="registerLogin">Your login</label>
          <input
            type="text"
            id="registerLogin"
            className={formStyles.input}
            maxLength={50}
            value={formData.login}
            autoComplete={'cc-name'}
            onChange={onInputChange('login')}
            onFocus={onInputFocus('login')}
          />
          <span className={formStyles.subText}>*Incorrect login</span>
        </div>
        <div className={cls(formStyles.field, toggleErrorClass(formData.invalidFields,'password', formStyles.isErrorField ))}>
          <label className={formStyles.label} htmlFor="registerPassword">Your password</label>
          <input
            type="password"
            id="registerPassword"
            className={formStyles.input}
            value={formData.password}
            autoComplete={'cc-name'}
            onChange={onInputChange('password')}
            onFocus={onInputFocus('password')}
          />
          <span className={formStyles.subText}>*Incorrect password</span>
        </div>
        <div className={cls(formStyles.field)}>
          <div className={formStyles.alert}>{formData.error ? <span className={formStyles.subText}>*User already exist</span> : '' }</div>
        </div>
        <div className={cls(formStyles.field, 'ta-c')}>
          <button
            type="button"
            className={cls(formStyles.btn)}
            onClick={goToLoginPage(navigate)}
          >
            Cancel
          </button>
          &nbsp;
          <button
            type="submit"
            className={cls(formStyles.btn, formStyles.btnSuccess)}
            disabled={isSubmitting}
          >
            Create account »
          </button>
        </div>
      </form>
    </section>
  )
}
