import api  from '../../api/api'
import { useAppDispatch } from '../../app/hooks';
import { IFormData, Login } from '../../components/auth/Login'
import { signin } from '../../redux/slices/authSlice';

export interface ILoginPage {
}

export const LoginPage = ({ }: ILoginPage) => {

  const dispatch = useAppDispatch();

  const authUser = (data: IFormData) => {
    api.auth.login({
      login: data.login,
      password: data.password
    })
      .then(response => {
        dispatch(signin(response));
      });
  }

  return (
    <div>
      <Login
        onLogin={authUser}
      />
    </div>
  )
}
