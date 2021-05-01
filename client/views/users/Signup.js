import React, { useState } from "react";
import ProjectImage from "../../assets/images/project-background.svg";
import ApiUser from "./ApiUser";

export const Signup = () => {
  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_type: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = () => {
    const user = {
      user_name: values.user_name,
      user_email: values.user_email,
      user_password: values.user_password,
      user_type: values.user_type,
    };

    if (user.user_name !== "") {
      ApiUser.create(user).then((result) => {
        console.log(result);
      });
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-stretch">
        <div
          className="lg:flex w-1/2 hidden bg-contain relative items-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ProjectImage})`,
          }}
        ></div>
        <div className="md:w-1/2 max-w-lg px-4 py-5 my-10 mx-10 shadow-none">
          <div className="text-left p-0 font-sans">
            <h1 className=" text-gray-800 text-3xl font-medium">
              Create an account
            </h1>
          </div>
          <form method="POST" action="#" className="p-0">
            <div className="mt-5">
              <input
                type="text"
                id="user_name"
                name="user_name"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                placeholder="Username"
                onChange={handleChange("user_name")}
                required
              />
            </div>
            <div className="mt-5">
              <input
                type="text"
                id="user_email"
                name="user_email"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                placeholder="Email"
                onChange={handleChange("user_email")}
                required
              />
            </div>
            <div className="mt-5">
              <input
                type="password"
                id="user_password"
                name="user_password"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
                placeholder="Password"
                onChange={handleChange("user_password")}
                required
              />
            </div>
            <div className="mt-5">
              <select
                id="user_type"
                name="user_type"
                className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                onChange={handleChange("user_type")}
                required
              >
                <option value="" disabled selected hidden>
                  Select User Type
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="mt-6 block p-5 text-sm md:font-sans text-xs text-gray-800">
              <input
                type="checkbox"
                className="inline-block border border-black-500"
              />
              <span className="inline ml-1">
                By creating an account you are agreeing to our
                <a
                  className=""
                  href="/s/terms"
                  target="_blank"
                  data-test="Link"
                >
                  <span className="underline ">Terms and Conditions</span>
                </a>
                and
                <a
                  className=""
                  href="/s/privacy"
                  target="_blank"
                  data-test="Link"
                >
                  <span className="underline">Privacy Policy</span>
                </a>
              </span>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
                onClick={onSubmit}
              >
                Sign up with email
              </button>
            </div>
          </form>
          <a className="" href="/login" data-test="Link">
            <span className="block  p-5 text-center text-gray-800  text-xs ">
              Already have an account?
            </span>
          </a>
        </div>
      </section>
    </>
  );
};
