import OrderDetails from "@/components-account/OrderDetails";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <OrderDetails orderId={Number(params.slug)} />
    </>
  );
};

export default page;
