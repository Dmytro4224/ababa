import { IRegisterFormData, RegisterView } from '../../components/auth/RegisterView';
import { useSignupMutation } from '../../redux/api/authApi';

export interface IRegisterPage {
}

export const RegisterPage = ({ }: IRegisterPage) => {

  const [signup, { isLoading, data }] = useSignupMutation();

  const onRegister = (data: IRegisterFormData) => {
    console.log('register data', data);
    signup({
      login: data.email,
      pwd: data.password,
      name: data.firstName
    });
  }
  return (
    <div>
      <RegisterView
        onRegister={onRegister}
        isSubmiting={isLoading}
        submitedData={data}
      />
    </div>
  )
}
