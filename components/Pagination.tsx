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
          className="border border-gray-300 py-2  px-3 text-content  shadow-searchbar transition-all hover:bg-gray-200"
          onClick={() => handleUpdateParams("1")}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span
            key="ellipsis-start"
            className="border border-gray-300 py-2  px-3 text-content"
          >
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const isCurrent = i === currentPage;
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleUpdateParams(i.toString())}
          className={`border border-gray-300 py-2  px-3 text-content  shadow-searchbar transition-all hover:bg-gray-200 ${
            isCurrent
              ? "bg-gray-200 font-bold"
              : "transition-all hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span
            key="ellipsis-end"
            className="border border-gray-300 py-2  px-3 text-content "
          >
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          className="border border-gray-300 py-2  px-3 text-content  shadow-searchbar transition-all hover:bg-gray-200"
          onClick={() => handleUpdateParams(totalPages.toString())}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center">
      <button
        className="border border-gray-300 py-2  px-3 text-content  shadow-searchbar transition-all hover:bg-gray-200 rounded-l-md"
        onClick={() => handleUpdateParams((currentPage - 1).toString())}
        disabled={isFirstPage}
      >
        &laquo; Prev
      </button>

      {renderPageNumbers()}

      <button
        className="border border-gray-300 py-2  px-3 text-content  shadow-searchbar transition-all hover:bg-gray-200 rounded-r-md "
        onClick={() => handleUpdateParams((currentPage + 1).toString())}
        disabled={isLastPage}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
