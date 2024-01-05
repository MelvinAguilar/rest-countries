"use client";

import React from "react";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { filters } from "@/constants";

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });

    router.push(newURL, { scroll: false });
  };

  return (
    <div className="">
      <select
        className="interactive dark: text-content w-full max-w-[12.5rem] cursor-pointer rounded-md px-[1.5rem] py-[1.125rem] shadow-searchbar"
        value={paramFilter || ""}
        onChange={(e) => handleUpdateParams(e.target.value)}
      >
        <option value="">Filter by Region</option>
        {filters.map((filter) => (
          <option key={filter.id} value={filter.name}>
            {filter.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
