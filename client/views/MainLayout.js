import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Sidebar from "../components/layout/Sidebar";
import Icon from "../assets/images/project-icon.svg";
import Favicon from "../assets/images/icon.svg";
import { Helmet } from "react-helmet";
import Navbar from "../components/layout/Navbar";

const navigation = ["Dashboard", "Team", "Projects", "Reports"];
const profile = ["Your Profile", "Sign in", "Sign up"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainLayout(props) {
  return (
    <div>
      <Helmet>
        <title>Project Assignment</title>
        <link rel="shortcut icon" href={Favicon} />
      </Helmet>

      <Navbar />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          {props.children}
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
