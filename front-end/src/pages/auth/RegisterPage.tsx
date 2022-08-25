import { useFullBg } from '../../app/useBodyClass';
import { IRegisterFormData, RegisterView } from '../../components/auth/RegisterView';
import { digestMessage } from '../../helpers/misc';
import {IRegisterResponse, useSigninMutation} from '../../redux/api/authApi';
import {fetchData} from "../../app/fetch";
import {useState} from "react";

export interface IRegisterPage {
}

interface IRegisterPageState{
  isLoading: boolean;
  data: IRegisterResponse | undefined;
}

export const RegisterPage = ({ }: IRegisterPage) => {

  useFullBg();

  const [signin, { }] = useSigninMutation();
  const [register, setRegister] = useState<IRegisterPageState>({
    isLoading: false,
    data: undefined
  })

  const onRegister = async (form: IRegisterFormData) => {
    const pwdHash = await digestMessage(form.password);

    setRegister({
      ...register,
      isLoading: true
    })

    const signup = await fetchData<IRegisterResponse>('/auth/signup', "POST", {
      login: form.login,
      pwd: pwdHash,
      name: form.name
    })

    setRegister({
      ...register,
      isLoading: false,
      data: signup
    })

    if (signup.statusCode === 200) {
      signin({
        login: form.login,
        pwd: pwdHash
      });
    }
  }
  return (
    <>
      <RegisterView
        onRegister={onRegister}
        isSubmitting={register.isLoading}
        submittedData={register.data}
      />
    </>
  )
}
