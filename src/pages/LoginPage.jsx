import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useMenu } from "../component/MenuContext";
import { SignInAccount } from "../lib/service";

function LoginPage() {
  const { signIn } = useMenu();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setpasswordInput] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const maxPasswordLength = 20;
  const maxEmailLength = 35;
  const minLength = 8;
  function handleShowPassword(e) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  function hanldeEmail(e) {
    if (e.target.value.length < maxEmailLength + 1) {
      setEmail(String(e.target.value));
    }
  }
  function handlePassword(e) {
    if (e.target.value.length <= maxPasswordLength + 1) {
      setPassword(String(e.target.value));
      setpasswordInput(true);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await SignInAccount({ email, password });
    const userInfo = data.user.user_metadata.user_metadata;
    setLoading(false);
    if (error) {
      console.error(error.message);
    } else {
      signIn(userInfo);
      navigate("/menu");
    }
  }

  return (
    <div className="flex flex-col w-96 border border-gray-500 bg-slate-100 ">
      <div className="mt-20 text-center">
        <p> Login </p>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 w-80 ">
          <div className="flex flex-col w-72">
            <div className="flex flex-row space-x-4">
              <label className="w-16">Email:</label>
              <input
                onChange={hanldeEmail}
                className="border"
                placeholder="Enter Your Email"
                value={email}
                name="email"
                required
              ></input>
            </div>
            {email.length >= maxEmailLength && (
              <p style={{ color: "red" }} className="mt-4">
                Email could not exceed {maxEmailLength - 1} characters.
              </p>
            )}
          </div>
          <div className="flex flex-col ">
            {" "}
            <div className="flex flex-row space-x-4">
              <label className="w-16">Password:</label>
              <input
                placeholder="Enter Your Password"
                required
                className="border"
                value={password}
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handlePassword}
              ></input>
              <button onClick={handleShowPassword}>
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </button>
            </div>
            {passwordInput && password.length < minLength && (
              <p style={{ color: "red" }} className="mt-4">
                password must at least {minLength} characters.
              </p>
            )}
            {passwordInput && password.length > maxPasswordLength && (
              <p style={{ color: "red" }} className="mt-4">
                password could not exceed {maxPasswordLength - 1} characters.
              </p>
            )}
          </div>
          <div className="flex h-36 w-full items-center justify-center">
            <button
              type="submit"
              className="border flex justify-center items-center text-lg rounded-lg bg-blue-500"
              style={{ width: "100px", height: "40px" }}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Login"}
            </button>
          </div>
          <div className="flex h-9 flex-row space-x-4">
            <span className="text-center ">Don't have a account?</span>
            <div>
              {" "}
              <Link to="/account/signup" className="text-blue-500">
                Register Now
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
