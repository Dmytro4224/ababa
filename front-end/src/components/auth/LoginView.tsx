import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginResponse } from '../../redux/api/authApi';
import styles from '../../styles/section.module.css';
import formStyles from '../../styles/form.module.css';

interface ILogin {
  onLogin: (data: ILoginFormData) => void;
  isSubmiting: boolean;
  submitedData: ILoginResponse | undefined;
}

export interface ILoginFormData {
  login: string;
  password: string;
}

const initialState: ILoginFormData = {
  login: '',
  password: ''
}

export const LoginView = ({ onLogin, isSubmiting, submitedData }: ILogin) => {

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate
    //loginRef.current?.classList.add('is-invalid');
    onLogin({ ...formData });
  }

  const goToRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate('/register');
  }

  const onInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [name]: e.target.value });

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Sign In</h3>
      <form onSubmit={onSubmit}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="authLogin">Your login</label>
          <input
            type="text"
            id="authLogin"
            className={formStyles.input}
            ref={loginRef}
            value={formData.login}
            onChange={onInputChange('login')}
          />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="authPassword">Your password</label>
          <input
            type="password"
            id="authPassword"
            className={formStyles.input}
            ref={passwordRef}
            value={formData.password}
            onChange={onInputChange('password')}
          />
        </div>
        <div className={`${formStyles.field} ta-c`}>
          <button type="submit" className={`${formStyles.btn} ${formStyles.btnPrimary}`}>
            Login
          </button>
          <br />
          or
          <br />
          <button
            type="button"
            className={`${formStyles.btn} ${formStyles.btnRed}`}
            onClick={goToRegister}
          >
            Create account »
          </button>
        </div>
      </form>
    </section>
  )
}
