import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const Layout = ({ classname, children, title }) => {
  return (
    <div className="wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title + " | Bountiful Basement"}</title>
      </Helmet>
      <MainHeader />
      <main className={classname}>{children}</main>
      <MainFooter />
    </div>
  );
};

export default Layout;
