import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/images/project-icon.svg";

export default function NavbarLanding(props) {
  return (
    <>
      <div className="mt-5 hidden md:block"></div>
      <>
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 overflow-hidden sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:-ml-5">
              <div className="flex-shrink-0">
                <Link to="/hr/" onClick={props.setIsLogin}>
                  <img className="w-40" src={Icon} alt="Workflow" />
                </Link>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6  text-base">
              <Link
                to="/hr/signup/"
                className="hover:bg-gray-200 px-3 py-2 rounded border border-gray-300 font-medium bg-white shadow-xl"
              >
                Sign up
              </Link>
              <Link
                to="/hr/signin/"
                className="hover:bg-green-600 px-3 py-2 shadow-xl border border-green-600 rounded ml-1 font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
