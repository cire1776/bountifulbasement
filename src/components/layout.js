import React from "react";
import { Link } from "gatsby";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <MainHeader />
      <main>{children}</main>
      <MainFooter />
    </div>
  );
};

export default Layout;
