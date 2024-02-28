"use client";

import { filters } from "@/constants";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useOuterClick } from "@/utils/useOuterClick";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowMenu } from "./Icons";

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("filter");

  const menubarRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleUpdateParams = (value: string) => {
    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });

    router.push(newURL, { scroll: false });
    closeMenu();
  };

  const removeFilter = () => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["filter"],
    });

    router.push(newUrl, { scroll: false });
    closeMenu();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  useOuterClick(menubarRef, closeMenu);

  return (
    <div
      ref={menubarRef}
      className="content relative z-20 w-full max-w-[12.5rem]"
    >
      <button
        type="button"
        className="interactive flex w-full cursor-pointer items-center justify-between rounded-md px-[1.5rem] py-[1.125rem] !pr-[1.125rem] text-left shadow-searchbar"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        {paramFilter || "Filter by Region"}
        <ArrowMenu width={12} height={12} />
      </button>
      {isMenuOpen && (
        <div
          className="interactive-no-hover absolute right-0 mt-2 w-full origin-top-right rounded-md"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          onBlur={closeMenu}
        >
          <ul className="z-10 py-[0.813rem]">
            {/* <li>
              <button
                onClick={() => removeFilter()}
                className="w-full px-6 py-[0.219rem] text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
              >
                Remove Filter
              </button>
            </li> */}
            {filters.map((filter) => (
              <li key={filter.id}>
                <button
                  onClick={() => handleUpdateParams(filter.name)}
                  className="w-full px-6 py-[0.219rem] text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  {filter.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filters;
