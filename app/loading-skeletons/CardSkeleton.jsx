import React from "react";

export const BookCardSkeleton = () => {
  return (
    <div className=" w-full max-w-[150px] md:max-w-[180px] mx-auto border border-black/10 bg-c-gray p-2 md:p-4 rounded-sm">
      <div className="rounded-sm h-[120px] md:h-[140px] lg:h-[160px] w-[80%] mx-auto bg-slate-200 animate-pulse "></div>

      <div className=" mt-3 ">
        <h1 className=" bg-slate-200 animate-pulse w-full h-5 mx-auto mb-1"></h1>
        <h2 className=" bg-slate-200 animate-pulse w-[80%] h-2 mx-auto mb-2 "></h2>
        <h1 className=" bg-slate-200 animate-pulse w-[60%] h-4 mx-auto"></h1>
      </div>
    </div>
  );
};

export const StationeryCardSkeleton = () => {
  return (
    <div className=" w-full max-w-[180px] mx-auto border border-black/10 bg-c-gray p-4">
      <div className="rounded-sm h-[120px] w-[80%] mx-auto bg-slate-200 animate-pulse "></div>

      <div className="mt-3 ">
        <h1 className=" bg-slate-200 animate-pulse w-full h-7 mx-auto mb-1"></h1>
        <h1 className=" bg-slate-200 animate-pulse w-[70%] h-4 mx-auto"></h1>
      </div>
    </div>
  );
};
