import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Icon from "../../assets/images/project-icon.svg";
import { useUIState } from "../../UserContext";
import { useUIDispatch } from "../../UserContext";
import auth from "../../auth/AuthHelper";

export default function Navbar(props) {
  const Border = props.border;

  const { user, login } = useUIState();
  const { logout } = useUIDispatch();

  const sendData = () => {
    props.sendToParent("12");
  };

  useEffect(() => {
    sendData();
  }, []);

  const handleClick = () => {
    // ApiUser.logout().then((result) => {
    //   console.log(result);
    // });
    auth.clearJWT(() => {
      logout();
    });
  };

  return (
    <>
      <Disclosure
        as="nav"
        className={"bg-green-500 " + (props.view && "hidden")}
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center -ml-5">
                  <div className="flex-shrink-0">
                    <Link to="/hr/">
                      <img className="w-40" src={Icon} alt="Workflow" />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 space-x-4 text-lg">
                      {login ? (
                        user.user_type === "ADMIN" ? (
                          <div>
                            <Link
                              to="/hr/dashboard/"
                              className={
                                "text-gray-700 hover:text-black px-3 pb-3 font-medium" +
                                (Border.dasbord && " border-b-4")
                              }
                            >
                              Dashboard
                            </Link>
                            <Link
                              to="/hr/employees/"
                              className={
                                "text-gray-700 hover:text-black px-3 pb-3 font-medium" +
                                (Border.employees && " border-b-4")
                              }
                            >
                              Employees
                            </Link>
                            <Link
                              to="/hr/projects/"
                              className={
                                "text-gray-700 hover:text-black px-3 pb-3 font-medium" +
                                (Border.projects && " border-b-4")
                              }
                            >
                              Projects
                            </Link>
                            <Link
                              to="/hr/assignment/"
                              className={
                                "text-gray-700 hover:text-black px-3 pb-3 font-medium" +
                                (Border.assignment && " border-b-4")
                              }
                            >
                              Assignment
                            </Link>
                            {/* <Link
                              to="/hr/users/"
                              className={
                                "text-gray-700 hover:text-black px-3 pb-3 font-medium" +
                                (Border.assignment && " border-b-4")
                              }
                            >
                              Users
                            </Link> */}
                          </div>
                        ) : (
                          <div className="font-medium text-2xl">
                            Project List
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6  text-base">
                    {login ? (
                      <>
                        <p className="mr-2">Welcome, {user.user_name}</p>
                        <Link
                          className="hover:bg-green-600 px-3 py-2 shadow-xl border border-green-600 rounded font-medium"
                          onClick={() => handleClick()}
                        >
                          Sign out
                        </Link>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                    {/* <Link
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
                    <Link
                      to="/hr/signin/"
                      className="hover:bg-green-600 px-3 py-2 shadow-xl border border-green-600 rounded ml-1 font-medium"
                      onClick={() => handleClick()}
                    >
                      Sign out
                    </Link> */}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-green-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/hr/dashboard/"
                  className="block hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/hr/employees/"
                  className="block hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                >
                  Employees
                </Link>
                <Link
                  to="/hr/projects/"
                  className="block hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                >
                  Projects
                </Link>
                <Link
                  to="/hr/assignment/"
                  className="block hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                >
                  Assignment
                </Link>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    to="/hr/signup/"
                    className="block hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/hr/signin/"
                    className="block hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
