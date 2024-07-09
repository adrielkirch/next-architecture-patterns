"use client";
import {
  RegisterRequestDto,
  LoginRequestDto,
} from "@/models/dtos/request/userRequestDto";
import { login, register } from "@/requests/authRequests";

import ModelAuthentication from "./model";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

class AuthenticationController {

  public auth: ModelAuthentication = new ModelAuthentication({
    registerFormData: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    loginFormData: {
      email: "",
      password: "",
    },
    isLogin: true,
    setRegisterFormData: useState<React.SetStateAction<RegisterRequestDto>>({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })[1],
    setLoginFormData: useState<React.SetStateAction<LoginRequestDto>>({
      email: "",
      password: "",
    })[1],
    setIsLogin: useState<React.SetStateAction<boolean>>(true)[1],
  });

  public router = useRouter();



  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (this.auth.isLogin) {
      this.auth.setLoginFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      this.router.push('/');
    } else {
      this.auth.setRegisterFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      this.auth.setIsLogin(true);
    }
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      if (this.auth.isLogin) {
        const userId = await login(this.auth.loginFormData);
        alert(`Login successful! User ID: ${userId}`);''
      } else {
        const userId = await register(this.auth.registerFormData);
        alert(`Registration successful! User ID: ${userId}`);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        alert(`${error}`);
      }
    }
  };

  validateEmail = (email: string): string | null => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(email) ? "Please enter a valid email address" : null;
  };

  validatePassword = (password: string): string | null => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return !regex.test(password)
      ? "Password must be at least 8 characters, include 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character"
      : null;
  };

  validateConfirmPassword = (confirmPassword: string): string | null => {
    const form = this.auth.isLogin ? this.auth.loginFormData : this.auth.registerFormData;
    return confirmPassword !== form.password ? "Passwords do not match" : null;
  };

  toggleForm = () => {
    this.auth.setIsLogin((prevState) => !prevState);
    this.auth.setRegisterFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  checkBtnDisabled = (): boolean => {
    if (this.auth.isLogin) {
      const loginForm = this.auth.loginFormData as LoginRequestDto;
      return (
        this.validateEmail(String(loginForm.email)) !== null ||
        this.validatePassword(String(loginForm.password)) !== null
      );
    } else {
      const registrationForm = this.auth.registerFormData as RegisterRequestDto;
      return (
        this.validateEmail(String(registrationForm.email)) !== null ||
        this.validatePassword(String(registrationForm.password)) !== null ||
        this.validateConfirmPassword(String(registrationForm.confirmPassword)) !== null
      );
    }
  };
};

export default AuthenticationController;
