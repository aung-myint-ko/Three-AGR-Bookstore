import React from "react";
import Link from "next/link";

export const CartNav = () => {
  return (
    <div className=" grid grid-cols-3 gap-x-4 items-center">
      <Link
        href={"/checkout/carts"}
        className=" rounded-sm text-base lg:text-xl w-full py-2 font-lato text-center bg-c-blue text-white"
      >
        Carts
      </Link>

      <Link
        href={"/checkout/delivery"}
        className="rounded-sm text-base lg:text-xl w-full py-2 font-lato text-center bg-c-gray-pale"
      >
        Delivery
      </Link>

      <Link
        href={"/checkout/payment"}
        className="rounded-sm text-base lg:text-xl w-full py-2 font-lato text-center bg-c-gray-pale"
      >
        Payment
      </Link>
    </div>
  );
};

export const DeliveryNav = () => {
  return (
    <div className=" grid grid-cols-3 gap-x-4 items-center">
      <Link
        href={"/checkout/carts"}
        className=" rounded-sm text-base lg:text-xl w-full py-2 font-lato text-center bg-c-gray-pale"
      >
        Carts
      </Link>

      <Link
        href={"/checkout/delivery"}
        className="rounded-sm text-base lg:text-xl w-full py-2 font-lato text-center bg-c-blue text-white "
      >
        Delivery
      </Link>

      <Link
        href={"/checkout/payment"}
        className="rounded-sm text-base lg:text-xl w-full py-2 font-lato text-center bg-c-gray-pale"
      >
        Payment
      </Link>
    </div>
  );
};

export const PaymentNav = () => {
  return (
    <div className=" grid grid-cols-3 gap-x-4 items-center">
      <Link
        href={"/checkout/carts"}
        className=" rounded-sm text-base lg:text-xl w-full py-2 font-lato text-center bg-c-gray-pale"
      >
        Carts
      </Link>

      <Link
        href={"/checkout/delivery"}
        className="rounded-sm text-base lg:text-xl w-full py-2 font-lato text-center bg-c-gray-pale"
      >
        Delivery
      </Link>

      <Link
        href={"/checkout/payment"}
        className="rounded-sm text-base lg:text-xl w-full py-2 font-lato text-center bg-c-blue text-white"
      >
        Payment
      </Link>
    </div>
  );
};
