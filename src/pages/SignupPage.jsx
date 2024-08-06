import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function SignupPage() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordInput, setpasswordInput] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const maxLength = 16;
  const minLength = 8;
  const navigate = useNavigate();
  function handlePhone(e) {
    e.preventDefault();
    if (e.target.value.length < 12) setPhone(String(e.target.value));
  }
  function handleEmail(e) {
    e.preventDefault();
    setEmail(String(e.target.value));
  }
  function handleShowPassword(e) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  function handleName(e) {
    if (e.target.value.length < maxLength + 1) {
      setName(String(e.target.value));
    }
  }
  function handlePassword(e) {
    if (e.target.value.length <= maxLength + 1) {
      setPassword(String(e.target.value));
      setpasswordInput(true);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_metadata: {
            name: name,
            phone: phone,
          },
        },
      },
    });
    if (error) {
      setLoading(false);
      setName("");
      setPassword("");
      setEmail("");
      setPhone("");
      setpasswordInput(false);
      alert("Error happened, please try again!");
    } else {
      setSuccessMessage("Check your email for the confirmation link");
      setLoading(false);
      navigate("/account/order");
    }
  }
  return (
    <div className="flex flex-col border border-gray-500  w-96 items-center bg-slate-100">
      <div className="mt-20 text-center">
        <p> Sign Up </p>
      </div>

      <div className="mt-5">
        <form onSubmit={handleSubmit} className="space-y-4 w-80">
          <div className="flex flex-row space-x-4">
            <label className="w-16"> Email:</label>
            <input
              required
              name="email"
              type="email"
              className="border"
              placeholder="Email Address"
              value={email}
              onChange={handleEmail}
            ></input>
          </div>
          <div className="flex flex-col w-72">
            <div className="flex flex-row space-x-4">
              <label className="w-16">Name:</label>
              <input
                required
                name="name"
                onChange={handleName}
                className="border"
                placeholder="Enter Your Name"
                value={name}
              ></input>
            </div>
            {name.length >= maxLength && (
              <p style={{ color: "red" }} className="mt-4">
                Name could not exceed {maxLength - 1} characters.
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
            {passwordInput && password.length > maxLength && (
              <p style={{ color: "red" }} className="mt-4">
                password could not exceed {maxLength - 1} characters.
              </p>
            )}
          </div>

          <div className="flex flex-row space-x-4">
            <label className="w-16"> Phone:</label>
            <input
              className="border"
              type="tel"
              value={phone}
              required
              placeholder="Enter Phone Number"
              onChange={handlePhone}
              name="phone"
            ></input>
          </div>
          <div className="flex h-36 w-full items-center justify-center">
            <button
              type="submit"
              className="border flex justify-center items-center text-lg rounded-lg bg-blue-500"
              style={{ width: "100px", height: "40px" }}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
