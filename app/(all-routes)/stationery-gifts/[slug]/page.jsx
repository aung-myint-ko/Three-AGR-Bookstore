import SpecificStationery from "@/components-stationery/SpecificStationery";
import { getStationeryByCategory } from "@/lib-api";
import React from "react";

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
  const stationeryData = await getStationeryByCategory(params.slug);
  return (
    <>
      <SpecificStationery
        stationerySlug={params.slug}
        stationeryData={stationeryData}
      />
    </>
  );
};

export default page;
