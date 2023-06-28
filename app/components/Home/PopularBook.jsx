"use client";
import { getBooksByCategory } from "@/lib-api";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { BookCardSkeleton } from "@/loading-skeletons/CardSkeleton";

const PopularBook = ({ popularBooks }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["book-status", "editor-choice"],
    queryFn: () => getBooksByCategory("editor-choice", 1, 10),
    initialData: popularBooks,
  });

  if (isError) return <div>is Error ...</div>;

  const editorChoiceBooks = data?.data;
  return (
    <div className=" px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14 bg-c-gray">
      <h1 className="  font-josefin font-bold text-2xl md:text-3xl text-center mb-5 md:mb-8">
        Popular Books
      </h1>
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-x-0 md:gap-y-8">
        {isLoading
          ? [0, 1, 2, 3, 4].map((index) => <BookCardSkeleton key={index} />)
          : editorChoiceBooks.map((book) => {
              return <Card key={book.id} id={book.id} data={book.attributes} />;
            })}
      </div>
    </div>
  );
};

export default PopularBook;
