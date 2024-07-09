import useAuthenticationPresenter from "./presenter";
import InputField from "@/app/layouts/core/inputField";
import Button from "@/app/layouts/core/button";

const AuthenticationView: React.FC = () => {
  const {
    isLogin,
    registerFormData,
    loginFormData,
    handleChange,
    handleSubmit,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    toggleForm,
    checkBtnDisabled,
  } = useAuthenticationPresenter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border border-white-100 rounded-lg px-6 py-6">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          {!isLogin && (
            <InputField
              id="fullname"
              name="name"
              type="text"
              label="Fullname"
              placeholder="Name"
              value={registerFormData.name}
              required={!isLogin}
              onChange={handleChange}
            />
          )}
          <InputField
            id="email-address"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            value={isLogin ? loginFormData.email : registerFormData.email}
            checkIsvalid={validateEmail}
            required
            
            onChange={handleChange}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={isLogin ? loginFormData.password : registerFormData.password}
            required
            checkIsvalid={validatePassword}
            onChange={handleChange}
          />
          {!isLogin && (
            <InputField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={registerFormData.confirmPassword}
              required={!isLogin}
              checkIsvalid={validateConfirmPassword}
              onChange={handleChange}
            />
          )}
          <div>
            <Button
              onClick={()=>handleSubmit}
              color="bg-blue-600"
              hoverColor="bg-indigo-700"
              text={isLogin ? "Sign in" : "Register"}
              disabled={checkBtnDisabled()}
            />
          </div>
        </form>
        <div className="text-center text-sm">
          {isLogin ? (
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
