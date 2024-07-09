import InputField from "../../../app/layouts/core/inputField";
import Button from "../../../app/layouts/core/button";
import AuthenticationPresenter from "./presenter";

const AuthenticationView: React.FC = () => {
  const presenter = new AuthenticationPresenter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 border border-white-100 rounded-lg px-6 py-6">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {presenter.auth.getIsLogin()
            ? "Sign in to your account"
            : "Create your account"}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={presenter.handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          {!presenter.auth.getIsLogin() && (
            <InputField
              id="fullname"
              name="name"
              type="text"
              label="Fullname"
              placeholder="Name"
              value={presenter.auth.getRegisterFormData().name}
              required={!presenter.auth.getIsLogin()}
              onChange={presenter.handleChange}
              checkIsvalid={presenter.validateEmail}
            />
          )}
          <InputField
            id="email-address"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            value={
              presenter.auth.getIsLogin()
                ? presenter.auth.getLoginFormData().email
                : presenter.auth.getRegisterFormData().email
            }
            required
            checkIsvalid={presenter.validateEmail}
            onChange={presenter.handleChange}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            value={
              presenter.auth.getIsLogin()
                ? presenter.auth.getLoginFormData().password
                : presenter.auth.getRegisterFormData().password
            }
            required
            checkIsvalid={presenter.validatePassword}
            onChange={presenter.handleChange}
          />
          {!presenter.auth.getIsLogin() && (
            <InputField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              value={presenter.auth.getRegisterFormData().confirmPassword}
              required={!presenter.auth.getIsLogin()}
              checkIsvalid={presenter.validateConfirmPassword}
              onChange={presenter.handleChange}
            />
          )}
          <div>
            <Button
              onClick={presenter.handleSubmit}
              color="bg-blue-600"
              hoverColor="bg-indigo-700"
              text={presenter.auth.getIsLogin() ? "Sign in" : "Register"}
              disabled={presenter.checkBtnDisabled()}
            />
          </div>
        </form>
        <div className="text-center text-sm">
          {presenter.auth.getIsLogin() ? (
            <p>
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={presenter.toggleForm}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={presenter.toggleForm}
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
