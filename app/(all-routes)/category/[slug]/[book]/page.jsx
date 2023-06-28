import Book from "@/components-bookDetails/Book";
import { getBooksDetailsBySlug } from "@/lib-api";
import React from "react";

export async function generateMetadata({ params }) {
  const book = await getBooksDetailsBySlug(params.book);
  const title = book.data[0].attributes.title;
  return {
    title,
  };
}

const page = ({ params }) => {
  return (
    <>
      <Book slug={params.book} />
    </>
  );
};

export default page;
