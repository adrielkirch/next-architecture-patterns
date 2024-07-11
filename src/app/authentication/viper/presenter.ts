import { FormEvent, useEffect, useState } from 'react';
import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";
import useAuthenticationInteractor from "./interactor";
import useAuthenticationRouter from "./router";

const useAuthenticationPresenter = () => {
  const { auth, loginAccount, registerAccount } = useAuthenticationInteractor();
  const { goToHomePage } = useAuthenticationRouter();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [inputErrorEmail, setInputErrorEmail] = useState<string | null>(null);
  const [inputErrorPassword, setInputErrorPassword] = useState<string | null>(null);
  const [inputErrorPasswordConfirm, setInputErrorPasswordConfirm] = useState<string | null>(null);


  useEffect(() => {
    checkBtnDisabled();
  }, [auth.registerFormData, auth.loginFormData])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      if (getFormData().isLogin) {
        const userId = await loginAccount();
        alert(`Login successful! User ID: ${userId}`);
        goToHomePage();
      } else {
        const userId = await registerAccount();
        alert(`Registration successful! User ID: ${userId}`);
        auth.setIsLogin(true);
      }
    } catch (error: any) {
      alert(`${error}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (getFormData().isLogin) {
      auth.setLoginFormData({
        ...getFormData().loginFormData,
        [name]: value,
      });
    } else {
      auth.setRegisterFormData({
        ...getFormData().registerFormData,
        [name]: value,
      });
    }
  };

  const toggleForm = () => {
    auth.setIsLogin(!auth.isLogin);
    resetFormData();
  };

  const resetFormData = () => {
    auth.setRegisterFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    auth.setLoginFormData({
      email: "",
      password: "",
    });
  };

  const getFormData = () => {
    return auth;
  };

  const validateEmail = (): string | null => {
    if (!auth.registerFormData.email || auth.isLogin) return null;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(auth.registerFormData.email) ? "Please enter a valid email address" : null;
  };

  const validatePassword = (): string | null => {
    if (!auth.registerFormData.password || auth.isLogin) return null;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return !regex.test(auth.registerFormData.password)
      ? "Password must be at least 8 characters, include 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character"
      : null;
  };

  const validateConfirmPassword = (): string | null => {
    if (!auth.registerFormData.confirmPassword) return auth.registerFormData.confirmPassword;
    return auth.registerFormData.confirmPassword !== auth.registerFormData.password
      ? "Passwords do not match"
      : null;
  };


  const checkBtnDisabled = (): void => {
    if (auth.isLogin) {
      setIsDisabled(false);
      setInputErrorEmail(null);
      setInputErrorEmail(null);
      setInputErrorEmail(null);
      return
    }
    const invalidEmail = validateEmail() !== null;
    const invalidPassword = validatePassword() !== null;
    const invalidConfirmPassword = validateConfirmPassword() !== null;

    setInputErrorEmail(validateEmail());
    setInputErrorPassword(validatePassword());
    setInputErrorPasswordConfirm(validateConfirmPassword());

    const disable = invalidEmail || invalidPassword || invalidConfirmPassword
    setIsDisabled(disable);
  };

  return {
    handleSubmit,
    toggleForm,
    resetFormData,
    getFormData,
    isDisabled,
    handleChange,
    inputErrorPasswordConfirm,
    inputErrorPassword,
    inputErrorEmail,
  };
};

export default useAuthenticationPresenter;
