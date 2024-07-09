import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";
import { Dispatch, SetStateAction } from "react";

interface AuthenticationModelConstructor {
  registerFormData: RegisterRequestDto;
  loginFormData: LoginRequestDto;
  isLogin: boolean;
  setRegisterFormData: Dispatch<SetStateAction<RegisterRequestDto>>;
  setLoginFormData: Dispatch<SetStateAction<LoginRequestDto>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export default class AuthenticationModel {
  public registerFormData: RegisterRequestDto;
  public loginFormData: LoginRequestDto;
  public isLogin: boolean;
  public setRegisterFormData: Dispatch<SetStateAction<RegisterRequestDto>>;
  public setLoginFormData: Dispatch<SetStateAction<LoginRequestDto>>;
  public setIsLogin: Dispatch<SetStateAction<boolean>>;

  constructor(props: AuthenticationModelConstructor) {
    this.registerFormData = props.registerFormData;
    this.loginFormData = props.loginFormData;
    this.isLogin = props.isLogin;
    this.setRegisterFormData = props.setRegisterFormData;
    this.setLoginFormData = props.setLoginFormData;
    this.setIsLogin = props.setIsLogin;
  }
}
