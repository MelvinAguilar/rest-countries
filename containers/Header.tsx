import React from "react";
import Link from "next/link";
import { Container } from "./Container";

const Header = () => {
  return (
    <header className="py-6 shadow-lg">
      <Container>
        <Link href="/" className="title">
          <h1>Where in the world?</h1>
        </Link>
      </Container>
    </header>
  );
};

export default Header;
