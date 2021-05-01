import React from "react";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./views/MainLayout";
import Home from "./views/Home";
import { Regions } from "./views/Regions";
import { Countrys } from "./views/Countrys";
import { Signup } from "./views/users/Signup";
import { Signin } from "./views/users/Signin";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <MainLayout>
          <Route exact path="/hr/dashboard/" component={Home} />
          <Route exact path="/hr/signup/" component={Signup} />
          <Route exact path="/hr/signin/" component={Signin} />
        </MainLayout>
      </Switch>
    </>
  );
};

export default MainRouter;
