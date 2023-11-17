import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface ILayoutProps {
  children?: React.ReactNode;
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
