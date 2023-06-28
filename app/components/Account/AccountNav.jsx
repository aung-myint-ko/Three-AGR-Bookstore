import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountNav = () => {
  const pathName = usePathname();

  return (
    <div className=" hidden md:block w-[180px] relative after:absolute after:w-[1px] after:top-0 after:right-0 after:h-full after:bg-black/20 ">
      <ul className=" flex flex-col gap-y-5 ">
        <Link
          href={"/account/profile"}
          className={`${
            pathName == "/account/profile" &&
            " underline decoration-c-blue decoration-2"
          }  text-lg font-lato opacity-90 hover:opacity-100 hover:text-c-blue hover:underline hover:decoration-c-blue hover:decoration-2`}
        >
          Profile
        </Link>
        <Link
          href={"/account/history"}
          className={` ${
            pathName == "/account/history" &&
            " underline decoration-c-blue decoration-2"
          } text-lg font-lato opacity-90 hover:opacity-100 hover:text-c-blue hover:underline hover:decoration-c-blue hover:decoration-2`}
        >
          History
        </Link>
      </ul>
    </div>
  );
};

export default AccountNav;
