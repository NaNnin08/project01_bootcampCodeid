import React, { useState } from "react";
import ProjectImage from "../../assets/images/sign-in.svg";
import ApiUser from "./ApiUser";

export const Signin = () => {
  const [values, setValues] = useState({
    user_email: "",
    user_password: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = () => {
    const user = {
      user_email: values.user_email,
      user_password: values.user_password,
    };

    if (user.user_email !== "") {
      ApiUser.create(user).then((result) => {
        console.log(result);
      });
    }
  };
  return (
    <>
      <section className="min-h-screen flex items-stretch">
        <div
          className="lg:flex w-screen md:hidden sm:hidden hidden bg-contain relative ml-30 items-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ProjectImage})`,
          }}
        ></div>
        <div className="w-3/4 ml-10 lg:w-96 px-4 py-5 lg:mt-12 lg:ml-80 shadow-none absolute z-10">
          <div className="text-left p-0 font-sans">
            <h1 className=" text-gray-800 text-3xl font-medium">Login</h1>
          </div>
          <form method="POST" action="#" className="p-0">
            <div className="mt-5">
              <input
                type="text"
                id="user_name"
                name="user_name"
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
            <div className="mt-10">
              <button
                type="submit"
                className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
                onClick={onSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};