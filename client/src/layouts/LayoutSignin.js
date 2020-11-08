import React from "react";
import Header from "../components/layout/Header";

const LayoutDefault = ({ children, history }) => (
  <React.Fragment>
    <Header navPosition="right" hideNav history={history} />
    <main className="site-content">{children}</main>
  </React.Fragment>
);

export default LayoutDefault;
