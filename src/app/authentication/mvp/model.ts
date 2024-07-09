import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";

interface AuthenticationModelConstructor {
  registerFormData: RegisterRequestDto;
  loginFormData: LoginRequestDto;
  isLogin: boolean;

}

export default class AuthenticationModel {
  public registerFormData: RegisterRequestDto;
  public loginFormData: LoginRequestDto;
  public isLogin: boolean;

  constructor(props: AuthenticationModelConstructor) {
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

  public setRegisterFormData(formData: RegisterRequestDto): void {
    this.registerFormData = formData;
  }

  public setLoginFormData(formData: LoginRequestDto): void {
    this.loginFormData = formData;
  }

  public getIsLogin(): boolean {
    return this.isLogin;
  }

  public setIsLogin(isLogin: boolean): void {
    this.isLogin = isLogin;
  }
}
