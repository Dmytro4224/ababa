import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ILoginResponse } from '../../redux/api/authApi';

interface ILogin {
  onLogin: (data: ILoginFormData) => void;
  isSubmiting: boolean;
  submitedData: ILoginResponse | undefined;
}

export interface ILoginFormData {
  login: string;
  password: string;
  rememberMe: boolean
}

const initialState: ILoginFormData = {
  login: '',
  password: '',
  rememberMe: true
}

export const LoginView = ({ onLogin, isSubmiting, submitedData }: ILogin) => {

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate
    //loginRef.current?.classList.add('is-invalid');
    onLogin({ ...formData });
  }

  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, login: e.target.value });
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  }

  const onRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rememberMe: e.target.checked });
  }

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <form className="login" onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="form-label" htmlFor="authEmail">Email address</label>
        <input
          type="text"
          id="authEmail"
          className="form-control"
          ref={loginRef}
          value={formData.login}
          onChange={onLoginChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="authPassword">Password</label>
        <input
          type="password"
          id="authPassword"
          className="form-control"
          ref={passwordRef}
          value={formData.password}
          onChange={onPasswordChange}
        />
      </div>

      <div className="mb-4">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            value=""
            id="authRememberMe"
            checked={formData.rememberMe}
            onChange={onRememberMeChange}
          />
          <label className="form-check-label" htmlFor="authRememberMe">Remember me</label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Sign in
      </button>

      <div className="text-center">
        <p>Not a member? <Link to="/register">Register</Link></p>
      </div>
    </form>
  )
}
