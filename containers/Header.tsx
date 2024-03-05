import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Header = () => {
  return (
    <header className="dark:bg-dark-secondary shadow-lg">
      <Container className="flex items-center justify-between py-[1.1875rem]">
        <Link href="/" className="title">
          <h2>Where in the world?</h2>
        </Link>
        <ThemeSwitcher />
      </Container>
    </header>
  );
};

export default Header;
