// src/app/authentication/page.tsx

"use client";

import { useState } from "react";
import InputField from "../layouts/core/inputField";
import Button from "../layouts/core/button";
import {
  RegisterRequestDto,
  LoginRequestDto,
} from "@/models/dtos/request/userRequestDto";

const Authentication = () => {
  const [formData, setFormData] = useState<RegisterRequestDto>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginFormData, setLoginFormData] = useState<LoginRequestDto>({
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup forms

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
  
    if (isLogin) {
      console.log("Login with:", loginFormData.email, loginFormData.password);
    } else {
      console.log(
        "Registering with:",
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
    }
  };

  const validateEmail = (email: string ): string | null => {
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
    const form = isLogin ? { ...loginFormData } : { ...formData };

    return confirmPassword !== form.password ? "Passwords do not match" : null;
  };

  const validateFullname = (fullname: string): string | null => {

    const words = fullname.trim().split(/\s+/);
    if (words.length < 2) {
      return "Full name must contain at least two words";
    }

    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(fullname)) {
      return "Full name must not contain numbers or special characters";
    }

    return null;
  };

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState); 
    setFormData({
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
        validateEmail(loginForm.email + "") !== null ||
        validatePassword(loginForm.password + "") !== null
      );
    } else {
      const registrationForm = formData as RegisterRequestDto;
      return (
        validateEmail(registrationForm.email + "") !== null ||
        validatePassword(registrationForm.password + "") !== null ||
        validateFullname(registrationForm.name + "") !== null ||
        validateConfirmPassword(registrationForm.confirmPassword + "") !== null
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
              value={formData.name}
              required={!isLogin}
              onChange={handleChange}
              checkIsvalid={validateFullname}
            />
          )}
          <InputField
            id="email-address"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            value={isLogin ? loginFormData.email : formData.email}
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
            value={isLogin ? loginFormData.password : formData.password}
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
              value={formData.confirmPassword}
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
            ></Button>
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
