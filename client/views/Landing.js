import React from "react";
import { Link } from "react-router-dom";
import ProjectImage from "../assets/images/bg-landing.svg";

const Landing = () => {
  return (
    <div className="mt-10 ml-10">
      <div className="absolute hidden md:block w-1/4 mt-20">
        <h1 className="my-4 text-blue-500 text-3xl md:text-5xl font-bold leading-tight text-center md:text-left">
          Bring all your work together
        </h1>
        <p className="mt-5 leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
          A better experience for your attendees and less stress to your team
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
      <div className="grid grid-cols-6">
        <div className="col-span-6 md:col-span-2 container mt-40 md:mt-0 md:pt-10 items-center">
          <div className=" w-full xl:w-2/5 lg:items-start">
            <h1 className="my-4 text-3xl md:text-5xl md:text-white font-bold leading-tight text-center md:text-left">
              Bring all your work together
            </h1>
            <p className="leading-normal md:text-white text-base md:text-2xl mb-8 text-center md:text-left">
              A better experience for your attendees and less stress to your
              team
            </p>
            <div className="text-base md:hidden ml-36">
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
        <div
          className="col-span-6 md:col-span-4 bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url(${ProjectImage})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Landing;
