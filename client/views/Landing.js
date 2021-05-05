import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row place-items-center md:place-items-start">
        <div className="flex-none md:w-1/3 h-screen">
          <div className="md:ml-10 md:mt-32">
            <h1 className="my-4 text-blue-500 text-3xl md:text-5xl font-bold leading-tight text-center md:text-left">
              Bring all your work together
            </h1>
            <p className="mt-5 leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
              A better experience for your attendees and less stress to your
              team
            </p>
            <div className="text-base">
              <Link
                to="/hr/signup/"
                className="hover:bg-black hover:border-bg-white hover:text-white bg-green-500 px-5 py-3 rounded-md font-medium bg-white"
              >
                Sign up
              </Link>
              <Link
                to="/hr/signin/"
                className="hover:bg-green-500 hover:border-green-500 hover:text-white px-5 py-3 border border-black ml-1 rounded-md font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-none md:w-2/3 h-screen mt-10">
          <img
            src={require(`../assets/images/bg-landing.svg`).default}
            alt="bg"
          />
        </div>
      </div>
    </>
  );
};

export default Landing;
