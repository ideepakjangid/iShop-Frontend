import Link from "next/link";
import React from "react";

const PageBreadcrumbs = ({ path, title, url, trashUrl, viewTrash }) => {
  return (
    <div className="flex justify-between items-center my-6">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {path.map((paths, index) => {
            return (
              <li key={index} className="inline-flex items-center">
                <Link
                  href={index == 0 ? '/admin' : `/admin/${paths.toLowerCase()}`}
                  className={`inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white ${index == path.length-1 && "text-blue-600"}`}
                >
                  {index == 0 ? (
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                  ) : (
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  )}
                  {paths}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
      <div>
        <div className="pe-3">
          {url == trashUrl && (
            <Link
              href={viewTrash}
              className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none "
            >
              Trash Bin
            </Link>
          )}
          <Link
            href={url}
            className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none "
          >
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageBreadcrumbs;
