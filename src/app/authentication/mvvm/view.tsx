"use client";

import InputField from "../../layouts/core/inputField";
import Button from "../../layouts/core/button";
import useAuthenticationViewModel from "./viewModel";


const AuthenticationView = () => {
  const viewModel = useAuthenticationViewModel();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border border-white-100 rounded-lg px-6 py-6">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {viewModel.isLogin ? "Sign in to your account" : "Create your account"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={viewModel.handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          {!viewModel.isLogin && (
            <InputField
              id="fullname"
              name="name"
              type="text"
              label="Fullname"
              placeholder="Name"
              value={viewModel.registerFormData.name}
              required={!viewModel.isLogin}
              onChange={viewModel.handleChange}
            />
          )}
          <InputField
            id="email-address"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            value={viewModel.isLogin ? viewModel.loginFormData.email : viewModel.registerFormData.email}
            required
            checkIsvalid={viewModel.validateEmail}
            onChange={viewModel.handleChange}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={viewModel.isLogin ? viewModel.loginFormData.password : viewModel.registerFormData.password}
            required
            checkIsvalid={viewModel.validatePassword}
            onChange={viewModel.handleChange}
          />
          {!viewModel.isLogin && (
            <InputField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={viewModel.registerFormData.confirmPassword}
              required={!viewModel.isLogin}
              checkIsvalid={viewModel.validateConfirmPassword}
              onChange={viewModel.handleChange}
            />
          )}
          <div>
            <Button
              onClick={()=>viewModel.handleSubmit}
              color="bg-blue-600"
              hoverColor="bg-indigo-700"
              text={viewModel.isLogin ? "Sign in" : "Register"}
              disabled={viewModel.checkBtnDisabled()}
            />
          </div>
        </form>
        <div className="text-center text-sm">
          {viewModel.isLogin ? (
            <p>
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={viewModel.toggleForm}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={viewModel.toggleForm}
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
