import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Favicon from "../../assets/images/icon.svg";
import ApiUser from "./ApiUser";

export const Signup = () => {
  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_type: "",
  });

  const [user, setUser] = useState([]);

  useEffect(() => {
    ApiUser.list()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      values.user_email &&
      values.user_name &&
      values.user_password &&
      values.user_type
    ) {
      if (user.map((rsl) => rsl.user_email).includes(values.user_email)) {
        alert("email sudah terdaftar");
      } else {
        ApiUser.create(values).then((result) => {
          console.log(result);
        });
        alert("Thank to Register, Please login to your account");
        location.href = "/hr/signin/";
      }
    } else {
      alert("Please fill all data");
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign up</title>
        <link rel="shortcut icon" href={Favicon} />
      </Helmet>

      <div className="flex flex-col md:flex-row place-items-center md:place-items-start">
        <div className="flex-none md:w-2/3 mt-10 hidden md:block">
          <img
            src={require(`../../assets/images/project-background.svg`).default}
            alt="bg"
          />
        </div>
        <div className="flex-none md:w-1/3">
          <div className="max-w-lg px-4 py-5 my-10 mx-10 border border-green-500 shadow-lg rounded">
            <div className="text-left p-0 font-sans">
              <h1 className=" text-gray-800 text-3xl font-medium text-center">
                Create an account
              </h1>
            </div>
            <form method="POST" className="p-0">
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
            <a className="" href="/hr/signin/" data-test="Link">
              <span className="block  p-5 text-center text-gray-800  text-xs ">
                Already have an account?
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* <section className="min-h-screen flex items-stretch">
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
          <form method="POST" className="p-0">
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
          <a className="" href="/hr/signin/" data-test="Link">
            <span className="block  p-5 text-center text-gray-800  text-xs ">
              Already have an account?
            </span>
          </a>
        </div>
      </section> */}
    </>
  );
};
