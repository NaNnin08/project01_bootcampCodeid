import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import { hot } from "react-hot-loader";
import { ContextProvider } from "./UserContext";

const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ContextProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ContextProvider>
  );
};

export default hot(module)(App);
