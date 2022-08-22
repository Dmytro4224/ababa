import api from '../../api/api';
import { useAppDispatch } from '../../app/hooks';
import { IRegisterFormData, RegisterView } from '../../components/auth/RegisterView'
import { signin } from '../../redux/slices/authSlice';

export interface IRegisterPage {
}

export const RegisterPage = (props: IRegisterPage) => {

  const dispatch = useAppDispatch();

  const onRegister = (data: IRegisterFormData) => {
    console.log('register data', data);

    api.auth.register({
      login: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    })
      .then(resposne => {
        dispatch(signin({
          statusCode: 200,
          statusMessage: 'success',
          data: {
            token: resposne.data.token,
            name: ''
          }
        }));
      });
  }
  return (
    <RegisterView
      onRegister={onRegister}
    />
  )
}
