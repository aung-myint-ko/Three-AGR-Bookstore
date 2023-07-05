"use client";
import { getProductByParams } from "@/lib-api";
import useDebounce from "@/lib-hook/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { HiX } from "react-icons/hi";
import { SearchResultsForDesktop } from "./SearchResultsPanel";

const Search = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [queryParams, setQueryParams] = useState("");
  const debouncedValue = useDebounce(queryParams, 500);
  const encodedQuery = encodeURI(queryParams);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodedQuery}&page=1`);
  };

  const { data } = useQuery({
    queryKey: ["search-params", debouncedValue],
    queryFn: () => getProductByParams(debouncedValue),
  });

  useEffect(() => {
    setPanel(true);
  }, [data]);

  const handleChange = (e) => {
    setQueryParams(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className={` hidden lg:flex lg:items-center md:w-[320px] md:h-8 md:border md:border-c-blue md:rounded-full md:overflow-hidden`}
      >
        <input
          type="text"
          value={queryParams}
          onChange={handleChange}
          className=" text-sm font-lato hidden md:block h-full w-[85%] px-3 text-black/70 outline-none placeholder:italic placeholder:text-sm"
          placeholder="Title, Author & Things"
        />
        <button
          type="submit"
          className=" md:w-[15%] md:h-full md:bg-c-blue md:flex md:justify-center md:items-center "
        >
          <GoSearch color="fff" size={24} className="hidden md:block" />
        </button>
      </form>

      <GoSearch
        onClick={handleSearchOpen}
        color="#082842"
        size={24}
        className=" lg:hidden"
      />
      {searchOpen && (
        <SearchForMobileTablet
          queryParams={queryParams}
          handleChange={handleChange}
          setSearchOpen={setSearchOpen}
          handleSearchClose={handleSearchClose}
        />
      )}
      {data?.length >= 1 && panel ? (
        <SearchResultsForDesktop
          products={data}
          link={`/search?query=${encodedQuery}&page=1`}
          panel={panel}
          setPanel={setPanel}
        />
      ) : (
        ""
      )}
    </>
  );
};

const SearchForMobileTablet = ({
  setSearchOpen,
  handleSearchClose,
  queryParams,
  handleChange,
}) => {
  const SearchRef = useRef();
  useEffect(() => {
    const CloseSearch = (e) => {
      const element = e.target;
      if (!SearchRef.current.contains(element)) {
        setSearchOpen(false);
      }
    };
    document.body.addEventListener("click", CloseSearch);
    return () => document.body.removeEventListener("click", CloseSearch);
  }, [setSearchOpen]);

  return (
    <div
      ref={SearchRef}
      className=" md:flex flex-col lg:hidden px-4 md:px-10 w-full h-[45px] md:h-[116px] md:py-5 absolute top-0 left-0 bg-c-gray z-30"
    >
      <h1 className=" hidden md:block lg:hidden font-josefin text-xl pb-2 ">
        What are you looking for?
      </h1>
      <div className="flex items-center h-full ">
        <input
          type="text"
          value={queryParams}
          onChange={handleChange}
          className=" basis-4/5 font-lato text-black/70 bg-c-gray h-full md:h-fit outline-none placeholder:italic placeholder:text-sm"
          placeholder="Title, Author & Things"
          autoFocus
        />
        <div className=" basis-1/5 flex justify-end items-center gap-7">
          <GoSearch color="#082842" size={24} className="" />
          <HiX onClick={handleSearchClose} color="#082842" size={28} />
        </div>
      </div>
    </div>
  );
};

export default Search;
