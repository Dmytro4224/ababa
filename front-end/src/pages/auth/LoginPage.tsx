import { useFullBg } from '../../app/useBodyClass';
import { ILoginFormData, LoginView } from '../../components/auth/LoginView';
import { useSigninMutation } from '../../redux/api/authApi';

export interface ILoginPage {
}

export const LoginPage = ({ }: ILoginPage) => {

  useFullBg();

  const [signin, { isLoading: isSubmiting, data }] = useSigninMutation();

  const authUser = (data: ILoginFormData) => {
    signin({
      login: data.login,
      pwd: data.password
    });
  }

  return (
    <>
      <LoginView
        onLogin={authUser}
        isSubmiting={isSubmiting}
        submitedData={data}
      />
    </>
  )
}
