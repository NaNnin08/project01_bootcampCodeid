import React from "react";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./views/MainLayout";
import Home from "./views/Home";
import { Signup } from "./views/users/Signup";
import { Signin } from "./views/users/Signin";
import { Projects } from "./views/projects/Projects";
import Landing from "./views/Landing";
import { Employees } from "./views/employees/Employees";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <MainLayout>
          <Route exact path="/hr/signup/" component={Signup} />
          <Route exact path="/hr/signin/" component={Signin} />
          <Route exact path="/hr/dashboard/" component={Home} />
          <Route exact path="/hr/projects/" component={Projects} />
          <Route exact path="/hr/employees/" component={Employees} />
        </MainLayout>
      </Switch>
    </>
  );
};

export default MainRouter;
