import React, { useState } from "react";
import Favicon from "../assets/images/icon.svg";
import { Helmet } from "react-helmet";
import Navbar from "../components/layout/Navbar";
import Landing from "./Landing";

export default function MainLayout(props) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      <Helmet>
        <title>Project Assignment</title>
        <link rel="shortcut icon" href={Favicon} />
      </Helmet>

      <Navbar setIsLogin={() => setIsLogin(!isLogin)} />

      {isLogin ? (
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            {props.children}
            {/* /End replace */}
          </div>
        </main>
      ) : (
        <Landing />
      )}
    </div>
  );
}
