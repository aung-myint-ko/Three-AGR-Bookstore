import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <div className=" font-lato w-[450px] p-10 rounded text-center bg-c-gray shadow-md border border-black/20">
        <h1 className=" text-5xl md:text-6xl mb-5">404</h1>
        <p className=" md:text-2xl font-medium mb-8">
          The page you have requested no longer exists
        </p>
        <Link
          href={"/"}
          className="px-8 py-2 rounded-sm font-medium text-lg text-white bg-c-blue/90 hover:bg-c-blue hover:shadow "
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
