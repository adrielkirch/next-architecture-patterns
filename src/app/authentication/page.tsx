"use client";
import { useState } from "react";
import InputField from "../../app/layouts/core/inputField";
import Button from "../../app/layouts/core/button";
import {
  RegisterRequestDto,
  LoginRequestDto,
} from "@/models/dtos/request/userRequestDto";
import { login, register } from "@/requests/authRequests";

const Authentication = () => {
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


  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setRegisterFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const userId = await login(loginFormData);
        alert(`Login successful! User ID: ${userId}`);
      } else {
        const userId = await register(registerFormData);
        alert(`Registration successful! User ID: ${userId}`);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        alert(`${error}`);
      }
    }
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

  const validateConfirmPassword = (confirmPassword: string): string | null => {
    const form = isLogin ? loginFormData : registerFormData;
    return confirmPassword !== form.password ? "Passwords do not match" : null;
  };

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
    setRegisterFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const checkBtnDisabled = (): boolean => {
    if (isLogin) {
      const loginForm = loginFormData as LoginRequestDto;
      return (
        validateEmail(String(loginForm.email)) !== null ||
        validatePassword(String(loginForm.password)) !== null
      );
    } else {
      const registrationForm = registerFormData as RegisterRequestDto;
      return (
        validateEmail(String(registrationForm.email)) !== null ||
        validatePassword(String(registrationForm.password)) !== null ||
        validateConfirmPassword(String(registrationForm.confirmPassword)) !== null
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border border-white-100 rounded-lg px-6 py-6">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          {!isLogin && (
            <InputField
              id="fullname"
              name="name"
              type="text"
              label="Fullname"
              placeholder="Name"
              value={registerFormData.name}
              required={!isLogin}
              onChange={handleChange}
              checkIsvalid={validateEmail}
            />
          )}
          <InputField
            id="email-address"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            value={isLogin ? loginFormData.email : registerFormData.email}
            required
            checkIsvalid={validateEmail}
            onChange={handleChange}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={isLogin ? loginFormData.password : registerFormData.password}
            required
            checkIsvalid={validatePassword}
            onChange={handleChange}
          />
          {!isLogin && (
            <InputField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={registerFormData.confirmPassword}
              required={!isLogin}
              checkIsvalid={validateConfirmPassword}
              onChange={handleChange}
            />
          )}
          <div>
            <Button
              onClick={handleSubmit}
              color="bg-blue-600"
              hoverColor="bg-indigo-700"
              text={isLogin ? "Sign in" : "Register"}
              disabled={checkBtnDisabled()}
            />
          </div>
        </form>
        <div className="text-center text-sm">
          {isLogin ? (
            <p>
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleForm}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleForm}
              >
                Sign in
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
