import { RegisterRequestDto, LoginRequestDto } from "@/models/dtos/request/userRequestDto";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface ModelAuthenticationConstructor {
    registerFormData: RegisterRequestDto;
    loginFormData: LoginRequestDto;
    isLogin: boolean;
    setRegisterFormData: Dispatch<SetStateAction<RegisterRequestDto>>;
    setLoginFormData: Dispatch<SetStateAction<LoginRequestDto>>;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkBtnDisabled: () => boolean;
    validateConfirmPassword: (value: string) =>  string | null;
    validatePassword: (value: string) =>  string | null;
    validateEmail: (value: string) =>  string | null;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    toggleForm: () => void;

}

export default class ModelAuthentication {
    public registerFormData: RegisterRequestDto;
    public loginFormData: LoginRequestDto;
    public isLogin: boolean;
    public setRegisterFormData: Dispatch<SetStateAction<RegisterRequestDto>>;
    public setLoginFormData: Dispatch<SetStateAction<LoginRequestDto>>;
    public setIsLogin: Dispatch<SetStateAction<boolean>>;
    public handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    public checkBtnDisabled: () => boolean;
    public validateConfirmPassword: (value: string) => string | null;
    public validatePassword: (value: string) => string | null;
    public validateEmail: (value: string) => string | null;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    public toggleForm: () => void;

    constructor(props: ModelAuthenticationConstructor) {
        this.registerFormData = props.registerFormData;
        this.loginFormData = props.loginFormData;
        this.isLogin = props.isLogin;
        this.setRegisterFormData = props.setRegisterFormData;
        this.setLoginFormData = props.setLoginFormData;
        this.setIsLogin = props.setIsLogin;
        this.handleChange = props.handleChange;
        this.checkBtnDisabled = props.checkBtnDisabled;
        this.validatePassword = props.validateConfirmPassword;
        this.validateConfirmPassword = props.validateConfirmPassword;
        this.validateEmail = props.validateEmail;
        this.handleSubmit = props.handleSubmit
        this.toggleForm = props.toggleForm
    }
}
