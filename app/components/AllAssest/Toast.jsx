"use client";
import React, { useEffect, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { BsCheckLg } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useToastStore } from "@/lib-store/toastStore";

const Toast = () => {
  const { status, message, show, setToast, cleanToast } = useToastStore(
    (state) => state
  );
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [message, setToast, cleanToast]);

  useEffect(() => {
    if (!open) {
      cleanToast();
    }
  }, [open]);

  if (!show) {
    return null;
  }

  return (
    <RadixToast.Provider swipeDirection="right" duration={2000}>
      <RadixToast.Root
        open={open}
        onOpenChange={setOpen}
        className={` ${
          status == "success"
            ? " animate-slideIn-toast "
            : " animate-slideUp-toast"
        } bg-c-gray rounded-md border border-c-blue/30 font-lato flex  overflow-hidden`}
      >
        <div
          className={`w-[5%]  ${
            status == "success" ? " bg-c-success" : "bg-c-error"
          } bg-c-error`}
        ></div>
        <div className=" w-[95%] p-3 md:p-5 flex justify-between items-center">
          <div>
            {status == "success" && (
              <RadixToast.Title className=" text-base md:text-xl font-medium mb-1">
                Successful !
              </RadixToast.Title>
            )}

            <RadixToast.Description className=" text-sm md:text-base opacity-80">
              {message}
            </RadixToast.Description>
          </div>
          {status == "success" ? (
            <BsCheckLg className={` w-7 h-7 md:w-9 md:h-9 text-c-success`} />
          ) : (
            <BiErrorCircle className={` w-7 h-7 md:w-9 md:h-9 text-c-error`} />
          )}
        </div>
      </RadixToast.Root>
      <RadixToast.Viewport
        className={` ${
          status == "success"
            ? "bottom-5 right-2"
            : " top-5 right-1/2 translate-x-1/2 "
        }
        fixed w-[320px] md:w-[500px] z-50`}
      />
    </RadixToast.Provider>
  );
};

export default Toast;
