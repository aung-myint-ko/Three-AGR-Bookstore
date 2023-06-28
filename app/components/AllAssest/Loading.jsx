import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className=" z-50 fixed w-full h-screen top-0 left-0 bg-white flex justify-center items-center">
      <AiOutlineLoading3Quarters size={40} className=" animate-spin" />
    </div>
  );
};

export const InsideLoading = () => {
  return (
    <div className="  w-full h-screen  bg-white flex justify-center items-center">
      <AiOutlineLoading3Quarters size={40} className=" animate-spin" />
    </div>
  );
};

export default Loading;
