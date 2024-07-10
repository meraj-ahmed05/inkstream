import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@meraj05/input-validation";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function sendRequest() {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Incorrect Credentials");
      // alert the user here that the request failed
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className=" text-slate-800  text-3xl font-bold block pb-5 pl-4 lg:hidden ">
            Welcome to Inkstream_
          </div>
          <div className="px-10">
            <div className="text-3xl font-extrabold text-center">
              {type === "signup" ? "Create an account" : "Sign in "}
            </div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" && (
              <LabelledInput
                label="Name"
                placeholder="Kafka..."
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            )}
            <LabelledInput
              label="Email"
              placeholder="kafka.notes@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="min-length-8"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
              toggleShowPassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />
            <button
              onClick={sendRequest}
              type="button"
              disabled={isLoading}
              className={`mt-8 w-full text-white bg-gray-800 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
              } font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
              {isLoading
                ? "Loading..."
                : type === "signup"
                ? "Sign up"
                : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  toggleShowPassword?: () => void;
  showPassword?: boolean;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
  toggleShowPassword,
  showPassword,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <div className="relative">
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
        {label.toLowerCase() === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
}
