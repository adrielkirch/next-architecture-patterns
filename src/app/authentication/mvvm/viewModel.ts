
import { FormEvent, useState } from "react";
import {
    RegisterRequestDto,
    LoginRequestDto,
} from "@/models/dtos/request/userRequestDto";
import { login, register } from "@/requests/authRequests";
import AuthenticationModel from "./model";
import { useRouter } from "next/navigation";

const useAuthenticationViewModel = (): AuthenticationModel => {
    const router = useRouter();
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
    return {
        loginFormData,
        registerFormData,
        isLogin,
        setLoginFormData,
        setRegisterFormData,
        setIsLogin,
        toggleForm,
        handleSubmit,
        validateEmail,
        validatePassword,
        validateConfirmPassword,
        checkBtnDisabled,
        handleChange,
    };
};

export default useAuthenticationViewModel;
