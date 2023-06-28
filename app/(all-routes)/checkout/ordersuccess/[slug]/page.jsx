import OrderSuccess from "@/components-checkout/OrderSuccess";
import React from "react";

export const metadata = {
  title: "Order Success",
};

const page = ({ params }) => {
  return (
    <>
      <OrderSuccess slug={params.slug} />
    </>
  );
};

export default page;
