import React from "react";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./views/MainLayout";
import Home from "./views/Home";
import { Regions } from "./views/Regions";
import { Countrys } from "./views/Countrys";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <MainLayout>
          <Route exact path="/hr/dashboard/" component={Home} />
          <Route exact path="/hr/region/" component={Regions} />
          <Route exact path="/hr/country/" component={Countrys} />
        </MainLayout>
      </Switch>
    </>
  );
};

export default MainRouter;
