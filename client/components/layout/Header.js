/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from "react";
import { ChevronDownIcon, UserAddIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  return (
    <div className="absolute left-0 w-full py-5 pl-5 md:pl-12 -mt-6 bg-white shadow-md">
      <div className="flex">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate ml-2">
          {props.title}
        </h2>
        <span className="absolute right-0 mr-10">
          <button
            type="button"
            onClick={() => props.setModal()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserAddIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            Add
          </button>
        </span>
      </div>
    </div>
  );
}
