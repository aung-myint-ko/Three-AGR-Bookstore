import React from "react";
import SpecificCategory from "@/components-category/SpecificCategory";

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
const page = ({ params }) => {
  return (
    <>
      <SpecificCategory categorySlug={params.slug} />
    </>
  );
};

export default page;
