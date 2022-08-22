import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface IRegisterView {
  onRegister: (data: IRegisterFormData) => void;
}

export interface IRegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const initialState: IRegisterFormData = {
  email: '',
  password: '',
  firstName: '',
  lastName: ''
}

export const RegisterView = ({ onRegister }: IRegisterView) => {

  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate
    //loginRef.current?.classList.add('is-invalid');
    onRegister({ ...formData });
  }

  const onInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [name]: e.target.value });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  return (
    <form className="login" onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="form-label" htmlFor="registerEmail">Email address</label>
        <input
          type="email"
          id="registerEmail"
          className="form-control"
          ref={emailRef}
          value={formData.email}
          onChange={onInputChange('email')}
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="registerPassword">Password</label>
        <input
          type="password"
          id="registerPassword"
          className="form-control"
          ref={passwordRef}
          value={formData.password}
          onChange={onInputChange('password')}
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="registerFirstName">First Name</label>
        <input
          type="text"
          id="registerFirstName"
          className="form-control"
          ref={firstNameRef}
          value={formData.firstName}
          onChange={onInputChange('firstName')}
        />
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="registerFirstLast">Last Name</label>
        <input
          type="text"
          id="registerFirstLast"
          className="form-control"
          ref={lastNameRef}
          value={formData.lastName}
          onChange={onInputChange('lastName')}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Register
      </button>

      <div className="text-center">
        <p>Already a member? <Link to="/login">Sign in</Link></p>
      </div>
    </form>
  )
}
