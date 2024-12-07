"use client";
import { PaginationForReviews } from "@/components-assest/Pagination";
import React, { useState } from "react";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import { HiX } from "react-icons/hi";
import Rating from "@mui/material/Rating";
import { useAuthStore } from "@/lib-store/authStore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookReviewsByBookSlug, postBookReviewsByBookId } from "@/lib-api";
import useInitialsName from "@/lib-hook/useInitialsName";

const validationSchema = Yup.object({
  reviewTitle: Yup.string()
    .required("Review title is required")
    .min(5, "Review title must be at least 5 characters")
    .max(100, "Review title cannot exceed 100 characters"),
  reviewText: Yup.string()
    .required("Review is required")
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review cannot exceed 1000 characters"),
});

const CustomerReview = ({ bookTitle, bookImage, bookId, bookSlug }) => {
  const router = useRouter();
  const { userId } = useAuthStore();
  const [writeReview, setWriteReview] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const { data } = useQuery({
    queryKey: ["review", bookSlug, pageNo],
    queryFn: () => getBookReviewsByBookSlug(bookSlug, pageNo, 3),
  });

  const pagination = data?.meta.pagination;

  const handleWriteReview = () => {
    if (userId) {
      setWriteReview(true);
    } else {
      router.push("/signin");
    }
  };

  return (
    <div id="review" className="mt-20">
      <div className=" flex justify-between items-center mb-4">
        <h1 className=" font-josefin text-2xl font-medium tracking-tight md:tracking-normal ">
          Customers Reviews
        </h1>
        <button
          onClick={handleWriteReview}
          className=" rounded-sm font-lato font-medium px-5 py-1 text-white bg-c-blue/90 hover:bg-c-blue hover:shadow "
        >
          Write Review
        </button>
      </div>

      <PaginationForReviews
        page={pageNo}
        pageCount={pagination?.pageCount}
        pageSize={pagination?.pageSize}
        total={pagination?.total}
        setPageNo={setPageNo}
      />
      <div className="mt-5 border-t border-black/30">
        {data?.data.length < 1 ? (
          <EmptyReview />
        ) : (
          data?.data.map((review) => {
            return <Review key={review.id} review={review.attributes} />;
          })
        )}
      </div>
      {writeReview && (
        <WriteReview
          setWriteReview={setWriteReview}
          bookImage={bookImage}
          bookTitle={bookTitle}
          bookId={bookId}
          bookSlug={bookSlug}
        />
      )}
    </div>
  );
};

//User's review card
const Review = ({ review }) => {
  const { title, description, star, users_permissions_user, createdAt } =
    review;

  //Destruct user's name, image, desctiption and date
  const username = users_permissions_user.data?.attributes.username;
  const userImage =
    users_permissions_user.data?.attributes.image.data?.attributes.url;
  const descriptionArray = description.split("\n");
  const formatedDate = new Date(createdAt).toLocaleDateString("en-Us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const name = useInitialsName(username);

  const renderStar = (index) => {
    if (index < star) {
      return <IoStar size={20} className=" text-c-yellow" />;
    } else {
      return <IoStar size={20} className=" text-c-gray2" />;
    }
  };
  return (
    <div className=" flex flex-col md:flex-row gap-2 md:gap-5 py-4 border-b border-black/30">
      <div className=" flex md:flex-col justify-between md:justify-normal basis-0 md:basis-1/4">
        <div>
          <h1 className=" font-lato text-lg font-medium tracking-wider mb-1">
            {username}
          </h1>
          <p className=" italic font-lato text-sm text-black/60 md:mb-3">
            {formatedDate}
          </p>
        </div>

        <div
          className={` ${
            !userImage && " bg-orange-500"
          } relative w-12 h-12 md:w-[120px] md:h-[120px] flex justify-center items-center rounded-full overflow-hidden shadow-md `}
        >
          {userImage ? (
            <Image src={userImage} alt="customer" fill />
          ) : (
            <h1 className=" text-white font-lato  md:text-5xl font-medium">
              {name.length <= 1 ? name[0] : name[0] + name[1]}
            </h1>
          )}
        </div>
      </div>
      <div className=" basis-0 md:basis-3/4">
        <h1 className=" font-lato text-xl md:text-2xl font-semibold tracking-wider ">
          {title}
        </h1>
        <ul className="flex items-center gap-x-2 mt-1 mb-2 md:mb-4">
          {[0, 1, 2, 3, 4].map((index) => (
            <span key={index}>{renderStar(index)}</span>
          ))}
        </ul>
        <div className=" text-sm md:text-base flex flex-col gap-y-1 md:gap-y-2 font-lato opacity-80">
          {descriptionArray.map((text, index) => {
            return <p key={index}>{text}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

const WriteReview = ({
  setWriteReview,
  bookImage,
  bookTitle,
  bookId,
  bookSlug,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const { userId } = useAuthStore();
  const [starValue, setStarValue] = useState(0);

  //Click to close write review panel
  const handleClose = () => {
    setWriteReview(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postBookReviewsByBookId,
    onError: (errors) => {},
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["review", bookSlug] });
      queryClient.invalidateQueries({ queryKey: ["books-details", bookSlug] });
      data && setWriteReview(false);
    },
  });

  //Post review to DB function
  const postUserReview = (data) => {
    mutation.mutate({
      data: {
        title: data.reviewTitle,
        description: data.reviewText,
        star: starValue,
        book: bookId,
        users_permissions_user: userId,
      },
    });
  };

  return (
    <div className=" z-50 fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-blur-sm">
      <div className=" w-[95%] md:w-[70%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-5 px-3 md:p-5 bg-white rounded shadow-md">
        <HiX
          onClick={handleClose}
          size={24}
          className="ml-auto cursor-pointer mb-4 opacity-70 hover:opacity-100 hover:shadow"
        />
        <div className="flex gap-x-3 mb-4">
          {/* Book image for both mobile & desktop view */}
          <div className=" w-[20%] md:basis-1/4 md:w-full md:max-h-[200px]">
            <Image
              src={bookImage}
              width="0"
              height="0"
              sizes="100vw"
              className=" mx-auto w-auto h-24 md:h-[120px]"
              alt="book"
            />
          </div>
          {/* Book name for mobile view */}
          <h1 className=" w-[80%] md:hidden font-josefin text-lg md:text-2xl font-bold mb-3">
            Write Your Reivew For : {bookTitle}
          </h1>
          {/* Book name & user's rating field for desktop view */}
          <div className=" hidden md:block basis-3/4 ">
            <div className=" md:block p-3">
              <h1 className=" font-josefin text-lg md:text-2xl font-bold mb-3">
                Write Your Reivew For : {bookTitle}
              </h1>
              <div className=" flex items-center gap-8 mb-1">
                <h1 className=" font-lato text-lg font-medium opacity-70">
                  Rating*
                </h1>
                <Rating
                  name="simple-controlled"
                  value={starValue}
                  size="large"
                  onChange={(event, newValue) => {
                    setStarValue(newValue);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* User's rating field for mobile view */}
        <div className=" md:hidden flex items-center gap-2 mb-2 px-2">
          <h1 className=" font-lato text-base md:text-lg font-medium opacity-70">
            Rating*
          </h1>
          <Rating
            name="simple-controlled"
            value={starValue}
            size="large"
            onChange={(event, newValue) => {
              setStarValue(newValue);
            }}
          />
        </div>
        {/* Input field for both mobile & desktop view */}
        <form action="" onSubmit={handleSubmit(postUserReview)}>
          <div className=" p-2 md:p-3 bg-c-gray-pale font-lato mb-2">
            <h1 className=" text-base md:text-lg font-medium opacity-70 mb-1">
              Review Title*
            </h1>
            <input
              {...register("reviewTitle")}
              type="text"
              placeholder="Eg: Good Book, Bad Book"
              className=" outline-none px-3 py-2 w-full border bg-c-gray border-c-blue/50 rounded"
            />
            {errors.reviewTitle && (
              <p className="pt-1 font-lato text-sm text-red-600">
                {errors.reviewTitle.message}
              </p>
            )}
          </div>
          <div className=" p-2 md:p-3 bg-c-gray-pale font-lato mb-4">
            <h1 className=" text-base md:text-lg font-medium opacity-70 mb-1">
              Review*
            </h1>
            <textarea
              {...register("reviewText")}
              rows={4}
              type="text"
              placeholder="Write Your Review Here"
              className=" rounded outline-none px-3 py-2 w-full border bg-c-gray border-c-blue/50 resize-none"
            />
            {errors.reviewText && (
              <p className="pt-1 font-lato text-sm text-red-600">
                {errors.reviewText.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className=" block mx-auto font-lato font-medium px-5 py-2 text-white bg-c-blue/90 hover:bg-c-blue hover:shadow "
          >
            Post Reviw
          </button>
        </form>
      </div>
    </div>
  );
};

const EmptyReview = () => {
  return (
    <div className=" mt-5 flex justify-center items-center h-[200px] bg-c-gray">
      <h1 className="opacity-80 text-xl md:text-2xl font-lato">
        No Reviews Found
      </h1>
    </div>
  );
};

export default CustomerReview;
