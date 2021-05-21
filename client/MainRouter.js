import React from "react";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./views/MainLayout";
import Home from "./views/Home";
import { Signup } from "./views/users/Signup";
import { Signin } from "./views/users/Signin";
import { Projects } from "./views/projects/Projects";
import { Employees } from "./views/employees/Employees";
import { assignment } from "./views/assignment/Assignment";
import Landing from "./views/Landing";
import { DetailEmployee } from "./views/employees/DetailEmployee";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/hr/" component={Landing} />
        <MainLayout>
          <Route exact path="/hr/signup/" component={Signup} />
          <Route exact path="/hr/signin/" component={Signin} />
          <Route exact path="/hr/dashboard/" component={Home} />
          <Route exact path="/hr/projects/" component={Projects} />
          <Route exact path="/hr/employees/" component={Employees} />
          <Route exact path="/hr/assignment/" component={assignment} />
          <Route exact path="/hr/employee/:id" component={DetailEmployee} />
        </MainLayout>
      </Switch>
    </>
  );
};

export default MainRouter;
