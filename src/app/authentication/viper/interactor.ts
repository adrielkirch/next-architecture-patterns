import { useState } from 'react';
import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";
import AuthenticationModel from "./model";

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

  const loginAsync = async (): Promise<string> => {
    // Example login function using loginFormData
    return `Logged in as ${auth.loginFormData.email}`;
  };

  const registerAsync = async (): Promise<string> => {
    // Example register function using registerFormData
    return `Registered user ${auth.registerFormData.email}`;
  };

  const validateEmail = (email: string): string | null => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(email) ? "Please enter a valid email address" : null;
  };

  const validatePassword = (password: string): string | null => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return !regex.test(password)
      ? "Password must be at least 8 characters, include 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character"
      : null;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    return password !== confirmPassword ? "Passwords do not match" : null;
  };

  return {
    auth,
    login: loginAsync,
    register: registerAsync,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
  };
};

export default useAuthenticationInteractor;
