"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "./Icons";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="my-20 flex items-center gap-2 rounded-md px-4 py-2 shadow-lg"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon width={16} height={16} />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
