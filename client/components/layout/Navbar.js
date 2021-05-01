import React from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Icon from "../../assets/images/project-icon.svg";

const navigation = ["Dashboard", "Team", "Projects", "Reports"];
const profile = ["Your Profile", "Sign in", "Sign up"];

export default function Navbar() {
  return (
    <>
      <Disclosure as="nav" className="bg-green-500">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="w-12" src={Icon} alt="Workflow" />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Link
                        to="/hr/dashboard/"
                        className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/hr/dashboard/"
                        className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Employees
                      </Link>
                      <Link
                        to="/hr/dashboard/"
                        className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Projects
                      </Link>
                      <Link
                        to="/hr/dashboard/"
                        className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Report
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Link
                      to="/hr/signup/"
                      className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/hr/signin/"
                      className="hover:bg-yellow-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
