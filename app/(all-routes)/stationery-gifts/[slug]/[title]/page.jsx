import StationeryDetails from "@/components-stationery/StationeryDetails";
import { getStationeryDetailsBySlug } from "@/lib-api";
import React from "react";

export async function generateMetadata({ params }) {
  const stationery = await getStationeryDetailsBySlug(params.title);
  const title = stationery.data[0].attributes.name;
  return {
    title,
  };
}

const page = async ({ params }) => {
  const stationeryData = await getStationeryDetailsBySlug(params.title);

  return (
    <>
      <StationeryDetails
        stationerySlug={params.title}
        stationeryData={stationeryData}
      />
    </>
  );
};

export default page;
