import React from "react";
import { Link } from "gatsby";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const Layout = ({ classname, children }) => {
  return (
    <div className="wrapper">
      <MainHeader />
      <main className={classname}>{children}</main>
      <MainFooter />
    </div>
  );
};

export default Layout;
