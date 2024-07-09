import { useState } from 'react';
import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";
import useAuthenticationInteractor from "./interactor";
import useAuthenticationRouter from "./router";

const useAuthenticationPresenter = () => {
  const interactor = useAuthenticationInteractor();
  const { goToHomePage } = useAuthenticationRouter();

  const handleSubmit = async () => {
    try {
      const formData = getFormData();
      if (formData.isLogin) {
        await interactor.login();
        goToHomePage();
      } else {
        await interactor.register();
      }
    } catch (error:any) {
      throw new Error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (getFormData().isLogin) {
      interactor.auth.setLoginFormData({
        ...getFormData().loginFormData,
        [name]: value,
      });
    } else {
      interactor.auth.setRegisterFormData({
        ...getFormData().registerFormData,
        [name]: value,
      });
    }
  };

  const toggleForm = () => {
    alert("Toggle");
    interactor.auth.setIsLogin(!interactor.auth.isLogin);
    resetFormData();
  };

  const resetFormData = () => {
    interactor.auth.setRegisterFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
   
    interactor.auth.setLoginFormData({  
      email: "",
      password: "",
    });
  };

  const getFormData = () => {
    return interactor.auth;
  };

  const validateForm = (isLogin: boolean, loginData: LoginRequestDto, registerData: RegisterRequestDto): boolean => {
    if (isLogin) {
      return (
        interactor.validateEmail(String(loginData.email)) === null &&
        interactor.validatePassword(String(loginData.password)) === null
      );
    } else {
      return (
        interactor.validateEmail(String(registerData.email)) === null &&
        interactor.validatePassword(String(registerData.password)) === null &&
        interactor.validateConfirmPassword(String(registerData.password), String(registerData.confirmPassword)) === null
      );
    }
  };

  // Define other necessary properties or methods based on your needs

  return {
    handleSubmit,
    toggleForm,
    resetFormData,
    getFormData,
    validateForm,
    handleChange,
    // Add other properties/methods as needed
  };
};

export default useAuthenticationPresenter;
