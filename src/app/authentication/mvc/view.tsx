"use client";
import InputField from "../../layouts/core/inputField";
import Button from "../../layouts/core/button";
import AuthenticationController from "./controller";


const AuthenticationView = () => {
  const controller = new AuthenticationController();
  return (

      <div className="min-h-screen flex items-center justify-center bg-black-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 border border-white-100 rounded-lg px-6 py-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {controller.auth.isLogin
              ? "Sign in to your account"
              : "Create your account"}
          </h2>
          <form className="mt-8 space-y-6" onSubmit={controller.handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            {!controller.auth.isLogin && (
              <InputField
                id="fullname"
                name="name"
                type="text"
                label="Fullname"
                placeholder="Name"
                value={controller.auth.registerFormData.name}
                required={!controller.auth.isLogin}
                onChange={controller.handleChange}
              />
            )}
            <InputField
              id="email-address"
              name="email"
              type="email"
              label="Email address"
              placeholder="Email address"
              value={
                controller.auth.isLogin
                  ? controller.auth.loginFormData.email
                  : controller.auth.registerFormData.email
              }
              required
              checkIsvalid={controller.validateEmail}
              onChange={controller.handleChange}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              value={
                controller.auth.isLogin
                  ? controller.auth.loginFormData.password
                  : controller.auth.registerFormData.password
              }
              required
              checkIsvalid={controller.validatePassword}
              onChange={controller.handleChange}
            />
            {!controller.auth.isLogin && (
              <InputField
                id="confirm-password"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                value={controller.auth.registerFormData.confirmPassword}
                required={!controller.auth.isLogin}
                checkIsvalid={controller.validateConfirmPassword}
                onChange={controller.handleChange}
              />
            )}
            <div>
              <Button
                onClick={controller.handleSubmit}
                color="bg-blue-600"
                hoverColor="bg-indigo-700"
                text={controller.auth.isLogin ? "Sign in" : "Register"}
                disabled={controller.checkBtnDisabled()}
              />
            </div>
          </form>
          <div className="text-center text-sm">
            {controller.auth.isLogin ? (
              <p>
                Don&apos;t have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={controller.toggleForm}
                >
                  Sign up
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={controller.toggleForm}
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
