"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/lib-store/authStore";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/lib-store/toastStore";
import { setCookie } from "cookies-next";

const validationSchema = Yup.object({
  name: Yup.string().required("Fullname is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

const SignUp = () => {
  const router = useRouter();
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const { setUserId } = useAuthStore();
  const { setToast } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const mutation = useMutation({
    mutationFn: (userData) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
        userData
      ),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_BAD_REQUEST") {
          if (
            error.response.data?.error.message ===
            "Email or Username are already taken"
          ) {
            setToast({
              status: "error",
              message: `Email or Username are already taken`,
            });
          } else {
            setToast({
              status: "error",
              message: `Something went Wrong. Please try again to signup`,
            });
          }
        } else {
          setToast({
            status: "error",
            message: `Something went Wrong. Please try again to signup`,
          });
        }
      } else {
        setToast({
          status: "error",
          message: `Something went Wrong. Please try again to signup`,
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
      username: data.name,
      email: data.email,
      password: data.confirmPassword,
    });
  };

  return (
    <div className=" px-4 sm:px-20 py-16 sm:py-14 w-full">
      <Link
        href={"/"}
        className={
          " font-lato pb-10 flex items-center gap-1 opacity-80 hover:opacity-100"
        }
      >
        <IoIosArrowBack size={20} /> Back To Home
      </Link>
      <div className=" flex justify-center">
        <div className="p-5 md:p-10 rounded border border-black/20 w-[90%] max-w-[550px] ">
          <h1 className=" font-lato text-3xl font-bold mb-4">Create Account</h1>
          <p className=" font-lato text-sm opacity-80 mb-5 tracking-wide ">
            By creating an account with our store, you will be able to move
            through the checkout process faster, view and track your orders in
            your account and more.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" mb-3">
              <label htmlFor="" className=" font-lato font-medium mb-1 ">
                Full Name *
              </label>
              <input
                {...register("name")}
                type={"text"}
                placeholder="Enter your name"
                className="border border-black/40 rounded outline-none px-4 py-2 w-full bg-c-gray text-base "
              />
              {errors.name && (
                <p className="pt-1 font-lato text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
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
            <div className=" mb-3">
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
            <div className=" mb-6">
              <label htmlFor="" className=" font-lato font-medium mb-1 ">
                Confirm Password *
              </label>
              <div className=" overflow-hidden relative flex items-center border border-black/40 bg-c-gray rounded">
                <input
                  {...register("confirmPassword")}
                  type={confirmPasswordShow ? "text" : "password"}
                  placeholder="Enter your password"
                  className=" px-4 outline-none py-2 w-full tracking-wide bg-c-gray text-base "
                />
                {confirmPasswordShow ? (
                  <BsFillEyeFill
                    onClick={() => setConfirmPasswordShow(false)}
                    size={24}
                    className={
                      "absolute top-1/2 -translate-y-1/2 right-4 opacity-50 cursor-pointer"
                    }
                  />
                ) : (
                  <BsFillEyeSlashFill
                    onClick={() => setConfirmPasswordShow(true)}
                    size={24}
                    className={
                      " absolute top-1/2 -translate-y-1/2 right-4 opacity-50 cursor-pointer"
                    }
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="pt-1 font-lato text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-8 py-2 rounded-sm font-lato font-medium text-lg text-white bg-c-blue/90 hover:bg-c-blue hover:shadow "
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
