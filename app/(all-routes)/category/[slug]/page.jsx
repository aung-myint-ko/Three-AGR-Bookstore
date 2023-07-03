import React from "react";
import SpecificCategory from "@/components-category/SpecificCategory";
import { getBooksByCategory } from "@/lib-api";

export async function generateMetadata({ params }) {
  const title = params.slug
    .replace(/-/g, " ")
    .split(" ")
    .join(" ")
    .toUpperCase();
  return {
    title,
  };
}
const page = async ({ params }) => {
  const specificCategory = await getBooksByCategory(params.slug, 1, 10);
  return (
    <>
      <SpecificCategory
        categorySlug={params.slug}
        specificCategory={specificCategory}
      />
    </>
  );
};

export default page;
