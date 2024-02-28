"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import { resultsPerPage } from "@/constants";

interface PaginationProps {
  total: number;
}

const PageSizeSelector = ({ total }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramPageSize = searchParams.get("pageSize");

  const handleUpdateParams = (value: string) => {
    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: "pageSize",
      value,
    });

    router.push(newURL, { scroll: false });
  };

  return (
    <div className="my-8 flex items-center justify-center gap-2 flex-wrap">
      <p className="text-content">Results per page: </p>
      <select
        className="interactive text-content mx-4 max-w-[25rem] rounded-md px-3 py-2 shadow-lg"
        value={paramPageSize || ""}
        onChange={(e) => handleUpdateParams(e.target.value)}
        aria-label="Results per page"
      >
        <option value="">Results per page</option>
        {resultsPerPage.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>

      <p className="text-content">Total: {total} results</p>
    </div>
  );
};

export default PageSizeSelector;
