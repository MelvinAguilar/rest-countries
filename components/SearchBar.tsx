"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { SearchIcon } from "./Icons";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        console.log("search is not empty");
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, query]);

  return (
    <div className="interactive relative w-full sm:max-w-[30rem]">
      <input
        type="text"
        className="text-content w-full rounded-lg bg-transparent py-[1.125rem] pl-[4.625rem] pr-3 shadow-lg"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchIcon className="text-content absolute left-6 top-1/2 -translate-y-1/2 transform" />
    </div>
  );
};

export default SearchBar;
