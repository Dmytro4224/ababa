import { useFullBg } from '../../app/useBodyClass';
import { IRegisterFormData, RegisterView } from '../../components/auth/RegisterView';
import { digestMessage } from '../../helpers/misc';
import { useSigninMutation, useSignupMutation } from '../../redux/api/authApi';

export interface IRegisterPage {
}

export const RegisterPage = ({ }: IRegisterPage) => {

  useFullBg();

  const [signup, { isLoading, data }] = useSignupMutation();
  const [signin, { }] = useSigninMutation();

  const onRegister = async (form: IRegisterFormData) => {
    const pwdHash = await digestMessage(form.password);
    signup({
      login: form.login,
      pwd: pwdHash,
      name: form.name
    })
      .unwrap()
      .then(response => {
        if (response.statusCode === 200) {
          signin({
            login: form.login,
            pwd: pwdHash
          });
        }
      })
      .catch(ex => {
        console.error(ex);
      });
  }
  return (
    <>
      <RegisterView
        onRegister={onRegister}
        isSubmiting={isLoading}
        submitedData={data}
      />
    </>
  )
}
