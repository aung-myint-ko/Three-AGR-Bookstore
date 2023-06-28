"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib-store/authStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToastStore } from "@/lib-store/toastStore";
import { setCookie } from "cookies-next";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const [passwordShow, setPasswordShow] = useState(false);
  const { setUserId } = useAuthStore();
  const { setToast } = useToastStore();

  const mutation = useMutation({
    mutationFn: (userData) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/`,
        userData
      ),

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_BAD_REQUEST") {
          if (
            error.response.data?.error.message ===
            "Invalid identifier or password"
          ) {
            setToast({
              status: "error",
              message: `Incorrect email or password`,
            });
          } else {
            setToast({
              status: "error",
              message: `Something went Wrong. Please close window and try again to signin`,
            });
          }
        } else {
          setToast({
            status: "error",
            message: `Something went Wrong. Please close window and try again to signin`,
          });
        }
      } else {
        setToast({
          status: "error",
          message: `Something went Wrong. Please close window and try again to signin`,
        });
      }
    },
    onSuccess: (data) => {
      setUserId(data.data?.user.id);
      setCookie("user-buying", "cart");
      router.push("/");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      identifier: data.email,
      password: data.password,
    });
  };

  return (
    <div className=" px-4 sm:px-20 py-16 sm:py-14 w-full">
      <Link
        href={"/"}
        className={
          " font-lato sm:pb-10 flex items-center gap-1 opacity-80 hover:opacity-100"
        }
      >
        <IoIosArrowBack size={20} /> Back To Home
      </Link>
      <div className=" sm:flex sm:justify-center">
        <div className="fixed sm:relative top-1/2 sm:top-0 left-1/2 sm:left-0 -translate-x-1/2 sm:-translate-x-0 -translate-y-1/2 sm:-translate-y-0 p-5 md:p-10 rounded border border-black/20 w-[90%] max-w-[550px] ">
          <h1 className=" font-lato text-3xl font-bold mb-4">Sign In</h1>
          <p className=" font-lato text-sm opacity-80 mb-5 tracking-wide ">
            If you already have an account with us, please log in. Otherwise,
            proceed to the{" "}
            <Link href={"signup"} className={" underline text-c-blue2"}>
              Sign Up
            </Link>{" "}
            page.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" mb-3">
              <label htmlFor="" className=" font-lato font-medium mb-1 ">
                E-mail *
              </label>
              <input
                {...register("email")}
                type={"email"}
                placeholder="Enter your email"
                className="border border-black/40 rounded outline-none px-4 py-2 w-full bg-c-gray text-base "
              />
              {errors.email && (
                <p className="pt-1 font-lato text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className=" mb-6">
              <label htmlFor="" className=" font-lato font-medium mb-1 ">
                Password *
              </label>
              <div className=" overflow-hidden relative flex items-center border border-black/40 bg-c-gray rounded">
                <input
                  {...register("password")}
                  type={passwordShow ? "text" : "password"}
                  placeholder="Enter your password"
                  className=" px-4 outline-none py-2 w-full tracking-wide bg-c-gray text-base "
                />
                {passwordShow ? (
                  <BsFillEyeFill
                    onClick={() => setPasswordShow(false)}
                    size={24}
                    className={
                      "absolute top-1/2 -translate-y-1/2 right-4 opacity-50 cursor-pointer"
                    }
                  />
                ) : (
                  <BsFillEyeSlashFill
                    onClick={() => setPasswordShow(true)}
                    size={24}
                    className={
                      " absolute top-1/2 -translate-y-1/2 right-4 opacity-50 cursor-pointer"
                    }
                  />
                )}
              </div>
              {errors.password && (
                <p className="pt-1 font-lato text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-8 py-2 rounded-sm font-lato font-medium text-lg text-white bg-c-blue/90 hover:bg-c-blue hover:shadow "
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
