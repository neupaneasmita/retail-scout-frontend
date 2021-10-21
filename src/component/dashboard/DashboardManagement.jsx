import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./static/Navbar";
import Dashboard from "./dashboard/Dashboard";
import Analyst from "./analyst/Analyst";
import Profile from "./profile/Profile";
import Products from "./products/Products";
import Prospects from "./prospects/Prospects";
import Lists from "./lists/Lists";
import ScrollToTop from "../common/ScrollToTop";

const DashboardManagement = () => {
  return (
    <div className="">
      <NavBar />
      <ScrollToTop />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/analytics/:id" component={Analyst} />
        <Route exact path="/dashboard/prospectlist/analytics/:id" component={Analyst} />
        <Route exact path="/dashboard/profile" component={Profile} />
        <Route exact path="/dashboard/profile/:id" component={Profile} />
        <Route exact path="/dashboard/products" component={Products} />
        <Route exact path="/dashboard/prospects" component={Prospects} />
        <Route exact path="/dashboard/prospectlist/:id" component={Lists} />
      </Switch>
    </div>
  );
};

export default DashboardManagement;
