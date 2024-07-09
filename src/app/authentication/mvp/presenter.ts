
import {
  RegisterRequestDto,
  LoginRequestDto,
} from "@/models/dtos/request/userRequestDto";
import { login, register } from "@/requests/authRequests";
import ModelAuthentication from "./model";



class AuthenticationPresenter {
  public auth = new ModelAuthentication({
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
  });

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (this.auth.getIsLogin()) {
      const updatedFormData: LoginRequestDto = {
        ...this.auth.getLoginFormData(),
        [name]: value,
      };
      this.auth.setLoginFormData(updatedFormData);
    } else {
      const updatedFormData: RegisterRequestDto = {
        ...this.auth.getRegisterFormData(),
        [name]: value,
      };
      this.auth.setRegisterFormData(updatedFormData);
    }
  };

  handleSubmit = async () => {
    try {
      if (this.auth.getIsLogin()) {
        const userId = await login(this.auth.getLoginFormData());
        alert(`Login successful! User ID: ${userId}`);
      } else {
        const userId = await register(this.auth.getRegisterFormData());
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
    const form = this.auth.getIsLogin()
      ? this.auth.getLoginFormData()
      : this.auth.getRegisterFormData();
    return confirmPassword !== form.password ? "Passwords do not match" : null;
  };

  toggleForm = () => {
    this.auth.setIsLogin(!this.auth.getIsLogin());
    this.auth.setRegisterFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  checkBtnDisabled = (): boolean => {
    if (this.auth.getIsLogin()) {
      const loginForm = this.auth.getLoginFormData() as LoginRequestDto;
      return (
        this.validateEmail(String(loginForm.email)) !== null ||
        this.validatePassword(String(loginForm.password)) !== null
      );
    } else {
      const registrationForm = this.auth.getRegisterFormData() as RegisterRequestDto;
      return (
        this.validateEmail(String(registrationForm.email)) !== null ||
        this.validatePassword(String(registrationForm.password)) !== null ||
        this.validateConfirmPassword(String(registrationForm.confirmPassword)) !==
        null
      );
    }
  };

};

export default AuthenticationPresenter;
