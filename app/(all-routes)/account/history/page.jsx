import Account from "@/components-account/Account";
import React from "react";

export const metadata = {
  title: "History",
};

const page = () => {
  return (
    <>
      <Account profile={false} />
    </>
  );
};

export default page;
