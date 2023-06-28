import React from "react";
import Image from "next/image";
import Link from "next/link";
import Template1 from "@/public-images/helath-template.png";
import Template2 from "@/public-images/history-template.png";
import Template3 from "@/public-images/novel-template.png";
import Template4 from "@/public-images/tech-template.png";
import { IoIosArrowForward } from "react-icons/io";

const NewRelease = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2">
      <NewReleaseCard
        image={Template1}
        slug={"/category/health-lifestyle?page=1"}
        title={"Health"}
        desc={"History is not the past but a map of the past"}
        color={"white"}
      />
      <NewReleaseCard
        image={Template2}
        slug={"/category/history?page=1"}
        title={"History"}
        desc={"History is not the past but a map of the past"}
        color={"black"}
      />
      <NewReleaseCard
        image={Template3}
        slug={"/category/romance?page=1"}
        title={"Novels"}
        desc={"History is not the past but a map of the past"}
        color={"black"}
      />
      <NewReleaseCard
        image={Template4}
        slug={"/category/computing-technology?page=1"}
        title={"Technology"}
        desc={"History is not the past but a map of the past"}
        color={"white"}
      />
    </div>
  );
};

const NewReleaseCard = ({ image, slug, title, desc, color }) => {
  return (
    <div className=" relative">
      <Image
        src={image}
        width={0}
        height={0}
        sizes={"100vw"}
        className="w-full h-[400px] md:h-[320px] lg:max-h-[500px] lg:h-auto"
        alt="template"
      />
      <div className=" w-[90%] absolute top-12 md:top-8 lg:top-16 left-[50%] -translate-x-1/2  text-center">
        <h1
          className={` font-josefin font-bold text-2xl mb:text-3xl lg:text-4xl text-${color}`}
        >
          {title}
        </h1>
        <p
          className={` font-lato text-${color} opacity-90 tracking-wide lg:tracking-normal lg:text-xl lg:mb-1`}
        >
          {desc}
        </p>
        <Link
          href={slug}
          className={
            "text-blue-500 flex items-center justify-center font-medium mx-auto"
          }
        >
          See All <IoIosArrowForward size={18} className="mt-[1px]" />
        </Link>
      </div>
    </div>
  );
};

export default NewRelease;
