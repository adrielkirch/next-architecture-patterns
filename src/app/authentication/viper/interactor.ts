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

  useEffect(()=> {
    console.log(validatePassword());
  },[auth])

  const loginAccount = async (): Promise<string> => {
    return await login(loginFormData);
  };

  const registerAccount = async (): Promise<string> => {
    return await register(registerFormData);
  };

  const validateEmail = (): string | null => {
    if (!registerFormData.email || isLogin) return null;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(registerFormData.email) ? "Please enter a valid email address" : null;
  };

  const validatePassword = (): string | null => {
    if (!registerFormData.password || isLogin) return null;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return !regex.test(registerFormData.password)
      ? "Password must be at least 8 characters, include 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character"
      : null;
  };

  const validateConfirmPassword = (): string | null => {
    if (!registerFormData.confirmPassword) return registerFormData.confirmPassword;
    return registerFormData.confirmPassword !== registerFormData.password
      ? "Passwords do not match"
      : null;
  };

  return {
    auth,
    loginAccount,
    registerAccount,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
  };
};

export default useAuthenticationInteractor;
