"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
}

const Pagination = ({ total, limit, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / limit);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handleUpdateParams = (value: string) => {
    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value,
    });

    router.push(newURL, { scroll: false });
  };

  if (
    totalPages > 0 &&
    !isFirstPage &&
    !isLastPage &&
    (currentPage < 1 || currentPage > totalPages)
  ) {
    handleUpdateParams("1");
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const pagesToShow = 3;

    let startPage = Math.max(1, currentPage - pagesToShow);
    let endPage = Math.min(totalPages, currentPage + pagesToShow);

    if (currentPage <= pagesToShow) {
      endPage = Math.min(totalPages, 2 * pagesToShow + 1);
    } else if (currentPage >= totalPages - pagesToShow) {
      startPage = Math.max(1, totalPages - 2 * pagesToShow);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className="text-content interactive border-l-0 px-3 py-2 shadow-searchbar"
          onClick={() => handleUpdateParams("1")}
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span
            key="ellipsis-start"
            aria-hidden="true"
            className="text-content cursor-not-allowed  px-3 py-2 ring-1 ring-gray-300 dark:ring-gray-700"
          >
            ...
          </span>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const isCurrent = i === currentPage;
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleUpdateParams(i.toString())}
          className={`text-content interactive border-l-0 px-3 py-2 shadow-searchbar ${isCurrent ? "bg-gray-200 font-bold underline dark:bg-gray-900" : ""
            }`}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span
            key="ellipsis-end"
            aria-hidden="true"
            className="text-content cursor-not-allowed px-3 py-2 ring-1 ring-gray-300 dark:ring-gray-700"
          >
            ...
          </span>,
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          className="text-content interactive border-l-0 px-3 py-2 shadow-searchbar"
          onClick={() => handleUpdateParams(totalPages.toString())}
        >
          {totalPages}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center flex-wrap gap-y-2 gap-x-[.0625rem]">
      <button
        className={`text-content interactive rounded-l-md px-3 py-2 shadow-searchbar ${isFirstPage ? "!dark:bg-gray-800 cursor-not-allowed" : ""
          }`}
        onClick={() => handleUpdateParams((currentPage - 1).toString())}
        disabled={isFirstPage}
      >
        &laquo; Prev
      </button>

      {renderPageNumbers()}

      <button
        className={`text-content interactive rounded-r-md border-l-0 px-3  py-2 shadow-searchbar ${isLastPage ? "!dark:bg-gray-800 cursor-not-allowed" : ""
          }`}
        onClick={() => handleUpdateParams((currentPage + 1).toString())}
        disabled={isLastPage}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
