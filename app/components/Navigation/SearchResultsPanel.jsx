import useTruncate from "@/lib-hook/useTruncate";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export const SearchResultsForDesktop = ({ products, link, setPanel }) => {
  // Return 6 products which is use in mobile and laptop
  let productsSubset;
  if (products.length > 5) {
    productsSubset = products.slice(0, 6);
  } else {
    productsSubset = products;
  }
  // Return 5 products which is use in mobile and laptop
  const productsSubsetforTablet = products.slice(0, 5);

  // When user click somewhere , search panel will closed
  useEffect(() => {
    const ClosePanel = (e) => {
      setPanel(false);
    };
    document.body.addEventListener("click", ClosePanel);
    return () => document.body.removeEventListener("click", ClosePanel);
  }, [setPanel]);

  return (
    <div className=" overflow-auto md:overflow-hidden block absolute left-0 top-[45px] md:top-[116px] w-full max-h-[180px] md:max-h-[278px] py-4 md:pt-5 md:pb-8 px-4 md:px-10 lg:px-20 bg-slate-100 shadow-md">
      {products.length >= 5 && (
        <Link
          href={link}
          className={
            " hidden md:flex justify-end text-blue-500 underline md:mb-2 mb-4"
          }
        >
          See All
        </Link>
      )}

      <div className=" md:hidden grid lg:grid grid-cols-1 lg:grid-cols-6 gap-2">
        {productsSubset.map((product) => {
          return (
            <ResultsCard key={product.id} attributes={product.attributes} />
          );
        })}
      </div>
      <div className=" hidden md:grid lg:hidden grid-cols-5 gap-2">
        {productsSubsetforTablet.map((product) => {
          return (
            <ResultsCard key={product.id} attributes={product.attributes} />
          );
        })}
      </div>

      {products.length >= 5 && (
        <Link
          href={link}
          className={
            "flex md:hidden text-xs justify-end text-blue-500 underline"
          }
        >
          See All
        </Link>
      )}
    </div>
  );
};

const ResultsCard = ({ attributes }) => {
  const imgUrl = attributes.image.data.attributes.url;
  const imgName = attributes.image.data.attributes.name;
  const slug = attributes.slug;

  const bookCategory = attributes.categories?.data[0]?.attributes.slug;
  const productCategory =
    attributes.product_categories?.data[0]?.attributes.slug;

  const words40Name = attributes.name
    ? useTruncate(attributes.name, 40)
    : useTruncate(attributes.title, 40);
  const words25Name = attributes.name
    ? useTruncate(attributes.name, 25)
    : useTruncate(attributes.title, 25);
  const words13Name = attributes.name
    ? useTruncate(attributes.name, 13)
    : useTruncate(attributes.title, 13);

  return (
    <Link
      href={
        Object.keys(attributes).length !== 10
          ? `/category/${bookCategory}/${slug}`
          : `/stationery-gifts/${productCategory}/${slug}`
      }
      className=" w-full md:max-w-[200px] flex md:flex-col justify-start md:justify-center items-center"
    >
      <div className=" mr-3 md:mr-0 md:mb-3 w-[50px] h-[50px] md:w-[100px] md:h-[100px] lg:w-[150px] lg:h-[150px] flex justify-center items-center rounded bg-white/50 border border-slate-200">
        <Image
          src={imgUrl}
          alt={imgName}
          width={0}
          height={0}
          sizes={"100vw"}
          className={` w-auto h-[70%] `}
        />
      </div>
      <h1 className=" md:hidden text-xs font-lato opacity-80">{words40Name}</h1>
      <h1 className=" hidden md:block lg:hidden text-sm text-center font-lato opacity-80">
        {words13Name}
      </h1>
      <h1 className=" hidden lg:block text-sm text-center font-lato opacity-80">
        {words25Name}
      </h1>
    </Link>
  );
};
