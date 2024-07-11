import { useEffect, useState } from 'react';
import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";
import AuthenticationModel from "./model";
import { login, register } from '@/requests/authRequests';

const useAuthenticationInteractor = () => {
  const [registerFormData, setRegisterFormData] = useState<RegisterRequestDto>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginFormData, setLoginFormData] = useState<LoginRequestDto>({
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const auth = new AuthenticationModel({
    registerFormData,
    loginFormData,
    isLogin,
    setRegisterFormData,
    setLoginFormData,
    setIsLogin,
  });


  const loginAccount = async (): Promise<string> => {
    return await login(loginFormData);
  };

  const registerAccount = async (): Promise<string> => {
    return await register(registerFormData);
  };


  return {
    auth,
    loginAccount,
    registerAccount,
  };
};

export default useAuthenticationInteractor;
