import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IRegisterResponse } from '../../redux/api/authApi';
import styles from '../../styles/section.module.css';
import formStyles from '../../styles/form.module.css';
import { cls } from '../../helpers/misc';
import { goToLoginPage } from '../../app/navigations';

interface IRegisterView {
  onRegister: (data: IRegisterFormData) => void;
  isSubmiting: boolean;
  submitedData: IRegisterResponse | undefined;
}

export interface IRegisterFormData {
  login: string;
  password: string;
  name: string;
  lastName: string;
}

const initialState: IRegisterFormData = {
  login: '',
  password: '',
  name: '',
  lastName: ''
}

export const RegisterView = ({ onRegister, isSubmiting, submitedData }: IRegisterView) => {
  console.log('isSubmiting', isSubmiting);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate
    //loginRef.current?.classList.add('is-invalid');
    onRegister({ ...formData });
  }

  const onInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [name]: e.target.value });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Create account</h3>
      <form onSubmit={onSubmit}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="registerName">Your name</label>
          <input
            type="text"
            id="registerName"
            className={formStyles.input}
            maxLength={50}
            ref={nameRef}
            value={formData.name}
            onChange={onInputChange('name')}
          />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="registerLogin">Your login</label>
          <input
            type="text"
            id="registerLogin"
            className={formStyles.input}
            maxLength={50}
            ref={emailRef}
            value={formData.login}
            onChange={onInputChange('login')}
          />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="registerPassword">Your password</label>
          <input
            type="password"
            id="registerPassword"
            className={formStyles.input}
            ref={passwordRef}
            value={formData.password}
            onChange={onInputChange('password')}
          />
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
            disabled={isSubmiting}
          >
            Create account »
          </button>
        </div>
      </form>
    </section>
  )
}
