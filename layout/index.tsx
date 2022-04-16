import React from "react";
import { Container } from "@mantine/core";
import Navbar from "../components/Navbar";
import Affix from "../components/Affix";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Affix />
      <Navbar />
      <Container py={24}>{children}</Container>
    </>
  );
};

export default Layout;
