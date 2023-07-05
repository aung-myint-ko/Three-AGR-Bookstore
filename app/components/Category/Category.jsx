"use client";
import React from "react";
import Link from "next/link";
import Card from "@/components-home/Card";
import BreadCrumb from "@/components-assest/BreadCrumb";
import { BookCardSkeleton } from "@/loading-skeletons/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getBooksByCategory } from "@/lib-api";

const Category = () => {
  return (
    <div className=" px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14">
      <BreadCrumb />
      <h1 className="font-josefin text-center font-bold text-2xl md:text-3xl mt-5 md:mb-1 ">
        Books Categories
      </h1>
      <p className="text-sm md:text-base text-center font-lato opacity-80 tracking-wide mb-5 md:mb-10">
        Here are ten of our best selling products. Explore yourself in the
        latest trends.
      </p>
      <div className=" md:flex">
        <CategoryNav />
        <div className=" basis-0 md:basis-3/4 lg:basis-4/5 flex flex-col md:gap-y-5">
          {categoriesLists.map((categoriesList, index) => {
            return (
              <CategorizedBooks
                key={index}
                categoryName={categoriesList.name}
                categoryLists={categoriesList.categories}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CategoryNav = () => {
  return (
    <ul className=" hidden md:basis-1/4 lg:basis-1/5 md:flex flex-col gap-y-5 after:w-[1px] relative after:absolute after:top-0 after:right-0 after:h-full after:bg-black/40 ">
      {categoriesLists.map((category, index) => {
        return (
          <div key={index}>
            <h1 className=" font-semibold font-josefin mb-2 text-xl">
              {category.name}
            </h1>
            {category.categories.map((category, index) => {
              return (
                <li key={index} className=" font-lato ">
                  <Link
                    href={category.url}
                    className="opacity-70 hover:opacity-100 hover:text-c-blue hover:underline hover:decoration-c-blue"
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </div>
        );
      })}
    </ul>
  );
};

const CategorizedBooks = ({ categoryName, categoryLists }) => {
  return (
    <div className="md:pl-8">
      <h1 className="mb-8 pb-3 md:text-center font-josefin text-2xl font-medium md:font-semibold border-b border-black/20 ">
        {categoryName}
      </h1>
      {categoryLists.map((categoryList, index) => {
        return <BookGroup key={index} categoryList={categoryList} />;
      })}
    </div>
  );
};

const BookGroup = ({ categoryList }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["book-category", categoryList.slug],
    queryFn: () => getBooksByCategory(categoryList.slug, 1, 5),
  });

  const books = data ? data.data : [];
  return (
    <>
      <div className=" mb-8 pb-8 border-b border-black/20">
        <div className=" flex justify-between items-center mb-5">
          <h1 className="font-lato text-xl font-medium italic">
            {categoryList.name}
          </h1>
          <Link
            href={categoryList.url}
            className="px-4 py-1 text-base rounded-sm bg-c-blue/90 text-white font-lato hover:shadow-md hover:bg-c-blue/100"
          >
            See More
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
          {isLoading
            ? [0, 1, 2, 3, 4].map((index) => <BookCardSkeleton key={index} />)
            : books.map((book) => {
                return (
                  <Card
                    key={book.id}
                    id={book.id}
                    data={book.attributes}
                    truncateCount={15}
                  />
                );
              })}
        </div>
      </div>{" "}
    </>
  );
};

const categoriesLists = [
  {
    name: "Top Categories",
    categories: [
      {
        name: "New Release",
        url: "/category/new-release?page=1",
        slug: "new-release",
      },
      {
        name: "Best Selling",
        url: "/category/best-selling?page=1",
        slug: "best-selling",
      },
      {
        name: "Editor's Choice",
        url: "/category/editor-choice?page=1",
        slug: "editor-choice",
      },
      {
        name: "Exclusive",
        url: "/category/exclusive?page=1",
        slug: "exclusive",
      },
    ],
  },
  {
    name: "Fiction",
    categories: [
      { name: "Thriller", url: "/category/thriller?page=1", slug: "thriller" },
      { name: "Crime", url: "/category/crime?page=1", slug: "crime" },
      { name: "Humor", url: "/category/humor?page=1", slug: "humor" },
      {
        name: "Adventure",
        url: "/category/adventure?page=1",
        slug: "adventure",
      },
      {
        name: "Historical",
        url: "/category/historical-fiction?page=1",
        slug: "historical-fiction",
      },
      { name: "Mystery", url: "/category/mystery?page=1", slug: "mystery" },
      {
        name: "Myth & Legend",
        url: "/category/myth-and-legend?page=1",
        slug: "myth-and-legend",
      },
      {
        name: "Short Stories",
        url: "/category/short-stories?page=1",
        slug: "short-stories",
      },
      { name: "Romance", url: "/category/romance?page=1", slug: "romance" },
    ],
  },
  {
    name: "Non Fiction",
    categories: [
      {
        name: "Art & Photography",
        url: "/category/art-and-photography?page=1",
        slug: "art-and-photography",
      },
      {
        name: "Biography",
        url: "/category/biography?page=1",
        slug: "biography",
      },
      {
        name: "Bussiness",
        url: "/category/bussiness?page=1",
        slug: "bussiness",
      },
      {
        name: "Computing & Technology",
        url: "/category/computing-and-technology?page=1",
        slug: "computing-and-technology",
      },
      {
        name: "Health & Lifestyle",
        url: "/category/health-and-lifestyle?page=1",
        slug: "health-and-lifestyle",
      },
      { name: "History", url: "/category/history?page=1", slug: "history" },
      {
        name: "Language & Educational",
        url: "/category/language-and-educational?page=1",
        slug: "language-and-educational",
      },
      {
        name: "Politics & Social Science",
        url: "/category/politics-and-social-science?page=1",
        slug: "politics-and-social-science",
      },
      {
        name: "Motivational",
        url: "/category/motivational?page=1",
        slug: "motivational",
      },
    ],
  },
];

export default Category;
