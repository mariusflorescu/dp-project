import React from "react";
import { Container } from "@mantine/core";
import Navbar from "../components/Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container py={24}>{children}</Container>
    </>
  );
};

export default Layout;
