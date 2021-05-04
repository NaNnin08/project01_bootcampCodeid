import React from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Icon from "../../assets/images/project-icon.svg";

const navigation = ["Dashboard", "Team", "Projects", "Reports"];
const profile = ["Your Profile", "Sign in", "Sign up"];

export default function Navbar(props) {
  return (
    <>
      <Disclosure as="nav" className="bg-green-500">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center -ml-5">
                  <div className="flex-shrink-0">
                    <Link to="/hr/" onClick={props.setIsLogin}>
                      <img className="w-40" src={Icon} alt="Workflow" />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4 text-lg">
                      <Link
                        to="/hr/dashboard/"
                        className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/hr/employees/"
                        className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                      >
                        Employees
                      </Link>
                      <Link
                        to="/hr/projects/"
                        className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                      >
                        Projects
                      </Link>
                      <Link
                        to="/hr/assignment/"
                        className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md font-medium"
                      >
                        Assignment
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6  text-base">
                    <Link
                      to="/hr/signup/"
                      className="hover:bg-black hover:border-bg-white hover:text-white px-3 py-1 rounded-md font-medium bg-white"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/hr/signin/"
                      className="hover:bg-white px-3 py-1 border border-white ml-1 rounded-md font-medium"
                    >
                      Sign in
                    </Link>
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
                {navigation.map((item, itemIdx) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
