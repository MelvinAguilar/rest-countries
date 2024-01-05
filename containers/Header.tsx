import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Header = () => {
  return (
    <header className="py-6 shadow-lg">
      <Container className="flex justify-between">
        <Link href="/" className="title">
          <h1>Where in the world?</h1>
        </Link>
        <ThemeSwitcher />
      </Container>
    </header>
  );
};

export default Header;
