import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";
import { login, register } from "@/requests/authRequests";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const useAuthenticationPresenter = () => {

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

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

  useEffect(() => {
    checkBtnDisabled();
  }, [loginFormData, registerFormData])

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      return;
    }
    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userId = await login(loginFormData);
        alert(`Login successful! User ID: ${userId}`);
        router.push('/');
      } else {
        const userId = await register(registerFormData);
        alert(`Registration successful! User ID: ${userId}`);
        setIsLogin(true);
      }
    } catch (error: any) {
      alert(`${error}`);
    }
  };


  const validateEmail = (email: string | null): string | null => {
    if (!email || isLogin) return null;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(email) ? "Please enter a valid email address" : null;
  };

  const validatePassword = (password: string | null): string | null => {
    if (!password || isLogin) return null;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return !regex.test(password)
      ? "Password must be at least 8 characters, include 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character"
      : null;
  };

  const validateConfirmPassword = (confirmPassword: string | null): string | null => {
    if (!confirmPassword) return confirmPassword;
    return confirmPassword !== registerFormData.password
      ? "Passwords do not match"
      : null;
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

  const checkBtnDisabled = (): void => {
    if (isLogin) {
      setIsDisabled(false)
    }
    const disable = 
    validateEmail(registerFormData.email) !== null ||
    validatePassword(registerFormData.password) !== null ||
    validateConfirmPassword(registerFormData.confirmPassword) !== null
    setIsDisabled(disable)
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
    loginFormData,
    isDisabled,

  };
};

export default useAuthenticationPresenter;
