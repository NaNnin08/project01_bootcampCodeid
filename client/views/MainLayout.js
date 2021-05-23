import React, { createContext, useState } from "react";
import Favicon from "../assets/images/icon.svg";
import { Helmet } from "react-helmet";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useUIState } from "../UserContext";

export const NavContext = createContext();

export default function MainLayout(props) {
  const [isLogin, setIsLogin] = useState(true);

  const { login } = useUIState();

  const [values, setValue] = useState("");

  console.log(values);

  const [nav, setNav] = useState(false);

  const [border, setBorder] = useState({});

  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>Project Assignment</title>
        <link rel="shortcut icon" href={Favicon} />
      </Helmet>

      <Navbar
        border={border}
        sendToParent={setValue}
        view={nav}
        isLogin={setIsLogin}
      />

      {JSON.parse(sessionStorage.getItem("jwt")) ? (
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <NavContext.Provider value={{ setNav, setBorder }}>
              {props.children}
            </NavContext.Provider>
            {/* /End replace */}
          </div>
        </main>
      ) : (
        <div className="min-h-screen">
          <p className="border border-black w-1/2 py-3 text-center text-4xl mt-36 mx-auto text-red-600 font-bold">
            Harap Login Untuk Mengakses Halaman ini!
          </p>
        </div>
      )}

      <Footer view={nav} />
    </div>
  );
}
