"use client";
import React from "react";

const Page = () => {
  return (
    <div className="bg-white dark:bg-gray-900 pt-32 lg:pt-20 min-h-screen">
      <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-start">
          <h1 className="mt-3 text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">
            Your Wishlist
          </h1>
          <p className="mt-4 text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
            03 items
          </p>
        </div>

        {/* Card Grid */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
          <div className="flex flex-col">
            <div className="">
              <img
                className="hidden lg:block"
                src={`https://cdn.bndla.com/12674/i/c69ae9f786b00edbee72c7cf069fd82c.jpg?Look-1858`} // Replace with your image URLs
                alt="Item"
              />
              <img
                className="hidden sm:block lg:hidden"
                src={`https://cdn.bndla.com/12674/i/c69ae9f786b00edbee72c7cf069fd82c.jpg?Look-1858`} // Replace with your image URLs
                alt="Item"
              />
              <img
                className="sm:hidden"
                src={`https://cdn.bndla.com/12674/i/c69ae9f786b00edbee72c7cf069fd82c.jpg?Look-1858`} // Replace with your image URLs
                alt="Item"
              />
              <button
                aria-label="close"
                className="top-4 right-4  p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                <svg
                  className="fil-current"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1L13 13"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                Item Name
              </p>
              <button
                aria-label="show menu"
                className="py-2.5 px-2 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                <svg
                  className="fill-stroke"
                  width={10}
                  height={6}
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col mt-12">
              <p className="text-xs text-gray-800 dark:text-white">MK617</p>
              <p className="mt-2 text-base font-medium text-gray-800 dark:text-white">
                Beige brown
              </p>
              <p className="mt-6 text-base font-medium text-gray-800 dark:text-white">
                42 size
              </p>
              <p className="mt-6 text-base font-medium text-gray-800 dark:text-white">
                $1,000
              </p>
              <div className="flex flex-col lg:flex-row items-center mt-10 space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                <button className="w-full py-4 text-lg text-white bg-white border border-gray-800 dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-gray-800 dark:hover:text-white hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2">
                  More information
                </button>
                <button className="w-full py-4 text-lg text-white bg-gray-800 border border-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
