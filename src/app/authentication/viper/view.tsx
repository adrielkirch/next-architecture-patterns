import InputField from "../../../app/layouts/core/inputField";
import Button from "../../../app/layouts/core/button";
import useAuthenticationPresenter from "./presenter";
import { useEffect } from "react";

const AuthenticationView = () => {
  const {
    handleChange,
    handleSubmit,
    toggleForm,
    getFormData,
    isDisabled,
    inputErrorEmail,
    inputErrorPasswordConfirm,
    inputErrorPassword,
  } = useAuthenticationPresenter();

  useEffect(() => {
    console.log("inputErrorPassword ->", inputErrorPassword)
  }, [inputErrorPassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border border-white-100 rounded-lg px-6 py-6">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {getFormData().isLogin
            ? "Sign in to your account"
            : "Create your account"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          {!getFormData().isLogin && (
            <InputField
              id="fullname"
              name="name"
              type="text"
              label="Fullname"
              placeholder="Name"
              value={getFormData().registerFormData.name}
              required={!getFormData().isLogin}
              onChange={handleChange}
            />
          )}
          <InputField
            id="email-address"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            value={
              getFormData().isLogin
                ? getFormData().loginFormData.email
                : getFormData().registerFormData.email
            }
            required
            onChange={handleChange}
            checkIsvalid={() => {
              return inputErrorEmail;
            }}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={
              getFormData().isLogin
                ? getFormData().loginFormData.password
                : getFormData().registerFormData.password
            }
            required
            onChange={handleChange}
            checkIsvalid={() => {
              return inputErrorPassword;
            }}
          />
          {!getFormData().isLogin && (
            <InputField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={getFormData().registerFormData.confirmPassword}
              required={!getFormData().isLogin}
              onChange={handleChange}
              checkIsvalid={() => {
                return inputErrorPasswordConfirm;
              }}
            />
          )}
          <div>
            <Button
              color="bg-blue-600"
              hoverColor="bg-indigo-700"
              text={getFormData().isLogin ? "Sign in" : "Register"}
              disabled={isDisabled}
            />
          </div>
        </form>
        <div className="text-center text-sm">
          {getFormData().isLogin ? (
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

export default AuthenticationView;
