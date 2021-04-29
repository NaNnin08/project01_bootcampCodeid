import React from "react";
import { Link } from "react-router-dom";
import { MapIcon, HomeIcon, GlobeIcon } from "@heroicons/react/outline";

export default function Sidebar() {
  return (
    <>
      <ul className="md:flex-col md:min-w-full flex flex-col list-none m-5">
        <li className="items-center">
          <Link
            className={"text-xs uppercase py-3 font-bold block "}
            to="/hr/dashboard/"
          >
            <i className={"fas fa-tv mr-2 text-sm "}></i>
            <HomeIcon
              className="h-5 w-5 Dashboard float-left"
              aria-hidden="true"
            />
            Dashboard
          </Link>
        </li>
        <li className="items-center">
          <Link
            className={"text-xs uppercase py-3 font-bold block "}
            to="/hr/region/"
          >
            <i className={"fas fa-tv mr-2 text-sm "}></i>
            <GlobeIcon
              className="h-5 w-5 Dashboard float-left"
              aria-hidden="true"
            />
            Regions
          </Link>
        </li>
        <li className="items-center">
          <Link
            className={"text-xs uppercase py-3 font-bold block "}
            to="/hr/country/"
          >
            <i className={"fas fa-tv mr-2 text-sm "}></i>
            <MapIcon
              className="h-5 w-5 Dashboard float-left"
              aria-hidden="true"
            />
            Country
          </Link>
        </li>
      </ul>
    </>
  );
}
