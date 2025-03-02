"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Pagination = ({ response }) => {
  const router = useRouter();
  const searchParmas = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const paginationHandler = (page_value) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page_value);
    router.push(url.toString());
  };

  let limit = response.Limit;
  let totalProducts = response.totalProducts;
  const total_pages = Math.ceil(totalProducts / limit);

  let pages = [];
  for (let i = 1; i <= total_pages; i++) {
    pages.push(
      <li
      key={i}
        onClick={() => paginationHandler(i)}
        className={`relative block rounded bg-info-100 px-3 py-1.5 text-sm font-medium  cursor-pointer text-info-700 transition-all duration-300 ${
          currentPage == i && "bg-black text-white"
        }`}
      >
        {i}
      </li>
    );
  }

  useEffect(() => {
    const page_number = Number(searchParmas.get("page")) || 1;
    setCurrentPage(page_number);
  }, [searchParmas]);

  useEffect(
    ()=>{
      setCurrentPage(1)
      const url = new URL(window.location.href);
      url.searchParams.set("page", 1);
      router.push(url.toString());
    },[limit]
  )

  return (
    <>
      <div className="max-w-full mt-6 bg-[#FAFAFB] py-4 flex justify-center items-center ">
        <ul className="list-style-none flex gap-1 items-center">
          <li
            onClick={() => paginationHandler(currentPage - 1)}
            className={`${
              currentPage == 1 && "pointer-events-none"
            } relative block rounded bg-transparent px-3 py-1.5 text-sm cursor-pointer  text-neutral-700 transition-all duration-300 dark:text-neutral-400`}
          >
            Previous
          </li>
          {pages}
          <li
            onClick={() => paginationHandler(currentPage + 1)}
            className={`${currentPage == total_pages && "pointer-events-none"} relative block rounded bg-transparent px-3 py-1.5 text-sm cursor-pointer  text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
          >
            Next
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
