import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";

interface ModelAuthenticationConstructor {
  registerFormData: RegisterRequestDto;
  loginFormData: LoginRequestDto;
  isLogin: boolean;

}

export default class ModelAuthentication {
  public registerFormData: RegisterRequestDto;
  public loginFormData: LoginRequestDto;
  public isLogin: boolean;

  constructor(props: ModelAuthenticationConstructor) {
    this.registerFormData = props.registerFormData;
    this.loginFormData = props.loginFormData;
    this.isLogin = props.isLogin;
  }

  public getRegisterFormData(): RegisterRequestDto {
    return this.registerFormData;
  }

  public getLoginFormData(): LoginRequestDto {
    return this.loginFormData;
  }

  // Setters for form data
  public setRegisterFormData(formData: RegisterRequestDto): void {
    this.registerFormData = formData;
  }

  public setLoginFormData(formData: LoginRequestDto): void {
    this.loginFormData = formData;
  }

  // Getter and setter for isLogin
  public getIsLogin(): boolean {
    return this.isLogin;
  }

  public setIsLogin(isLogin: boolean): void {
    this.isLogin = isLogin;
  }
}
