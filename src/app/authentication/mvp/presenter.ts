import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";
import { login, register } from "@/requests/authRequests";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useAuthenticationPresenter = () => {
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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setRegisterFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userId = await login(loginFormData);
        alert(`Login successful! User ID: ${userId}`);
        router.push("/");
      } else {
        const userId = await register(registerFormData);
        alert(`Registration successful! User ID: ${userId}`);
        setIsLogin(true);
      }
    } catch (error) {
      alert(`${error}`);
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

  const validateConfirmPassword = (confirmPassword: string): string => {
    return confirmPassword !== registerFormData.password
      ? "Passwords do not match"
      : "";
  };


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setRegisterFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const checkBtnDisabled = (): boolean => {
    if (isLogin) {
      return (
        validateEmail(String(loginFormData.email)) !== null ||
        validatePassword(String(loginFormData.password)) !== null
      );
    } else {
      return (
        validateEmail(String(registerFormData.email)) !== null ||
        validatePassword(String(registerFormData.password)) !== null ||
        validateConfirmPassword(String(registerFormData.confirmPassword)) !== null
      );
    }
  };


  return {
    isLogin,
    handleChange,
    handleSubmit,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    toggleForm,
    checkBtnDisabled,
    registerFormData,
    loginFormData

  };
};

export default useAuthenticationPresenter;
