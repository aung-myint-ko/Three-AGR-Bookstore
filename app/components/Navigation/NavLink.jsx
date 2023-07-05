"use client";
import React from "react";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Collapsible from "@radix-ui/react-collapsible";
import useUser from "@/lib-hook/useUser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useInitialsName from "@/lib-hook/useInitialsName";

export const NavLinkForDeskstop = ({ navLists }) => {
  const pathName = usePathname();
  // Sub-nav of top categories
  const topCategories = navLists[0].subNav[0];
  // Sub-nav of fiction & non-fiction
  const result = navLists[0].subNav.map((nav) => {
    if (nav.name !== "Top Categories") {
      return nav;
    }
  });
  const fictionNonfiction = result.filter(Boolean);
  return (
    <>
      {/* Nav Links for large screen (tablet/desktop) */}
      <div className=" hidden md:block">
        <NavigationMenu.Root className=" relative ">
          <NavigationMenu.List className=" flex items-center gap-x-7">
            {navLists.map((navList, index) => {
              return navList.subNav ? (
                <NavigationMenu.Item
                  key={index}
                  className={` ${
                    pathName == "/category" && " after:w-full"
                  }  font-lato text-lg relative after:absolute after:w-0 after:h-0.5 after:bg-c-blue after:-bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 after:ease-linear`}
                >
                  <NavigationMenu.Trigger>
                    <Link
                      href={"/category"}
                      className={`flex items-center gap-x-1`}
                    >
                      Category
                      <IoIosArrowDown
                        size={20}
                        className="dropdown-icon transition-all ease-linear"
                        aria-hidden
                      />
                    </Link>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className=" group absolute top-[50px] md:-left-[40px] lg:-left-[50px] md:w-[550px] lg:w-[750px] p-5 bg-c-gray border border-slate-300 rounded-sm">
                    <ListItemForTopCategories
                      name={topCategories.name}
                      categories={topCategories.categories}
                    />
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0">
                      {fictionNonfiction.map((nav, index) => {
                        return (
                          <ListItemForFictionNonFiction
                            key={index}
                            name={nav.name}
                            categories={nav.categories}
                          />
                        );
                      })}
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ) : (
                <NavigationMenu.Item
                  key={index}
                  className={` ${
                    pathName == navList.url && " after:w-full"
                  } font-lato text-lg relative after:absolute after:w-0 after:h-0.5 after:bg-c-blue after:-bottom-1 after:left-0 hover:after:w-full after:transition-all after:duration-300 after:ease-linear`}
                >
                  <Link href={navList.url}>{navList.name}</Link>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </>
  );
};

const ListItemForTopCategories = ({ name, categories }) => {
  return (
    <>
      <h1 className=" font-josefin font-bold mb-1 text-lg ">{name}</h1>
      <div className=" grid grid-cols-3 lg:grid-cols-4 gap-2 mb-3 ">
        {categories.map((category, index) => {
          return (
            <NavigationMenu.Link key={index} asChild>
              <Link href={category.url}>
                <h6 className=" p-2 flex justify-between bg-slate-100 hover:bg-c-gray-pale text-sm">
                  {category.name}
                  <IoIosArrowForward size={20} color={"#082842"} />
                </h6>
              </Link>
            </NavigationMenu.Link>
          );
        })}
      </div>
    </>
  );
};

const ListItemForFictionNonFiction = ({ name, categories }) => {
  return (
    <div>
      <h1 className=" font-josefin font-bold text-lg ">{name}</h1>
      <ul className=" grid md:grid-cols-3 lg:grid-cols-2 lg:grid-rows-4 text-sm ">
        {categories.map((category, index) => {
          return (
            <NavigationMenu.Link key={index} asChild>
              <Link href={category.url} key={index}>
                <li className="mt-1 hover:underline hover:decoration-c-blue hover:decoration-2 ">
                  {category.name}
                </li>
              </Link>
            </NavigationMenu.Link>
          );
        })}
      </ul>
    </div>
  );
};

export const NavLinkForMobile1 = ({
  name,
  subNav,
  setShowSubNavNo,
  url,
  closeNav,
}) => {
  const handleClick = (id) => {
    switch (id) {
      case "Top Categories":
        setShowSubNavNo(2);
        break;

      case "Fiction":
        setShowSubNavNo(3);
        break;
      case "Non Fiction":
        setShowSubNavNo(4);
        break;

      default:
        break;
    }
  };
  return (
    <>
      {/* Nav Links for mobile screen */}
      <div className=" md:hidden font-lato">
        {subNav ? (
          <Collapsible.Root
            className="px-4 py-2 "
            type="single"
            collapsible="true"
          >
            <Collapsible.Trigger className="CollapsibleTrigger w-full flex items-center justify-between text-xl">
              {name}
              <IoIosArrowDown
                className="CollapsibleChevron"
                size={24}
                color={"#0f0f0fcf"}
              />
            </Collapsible.Trigger>
            {subNav.map((nav, index) => {
              return (
                <Collapsible.Content
                  onClick={() => handleClick(nav.name)}
                  key={index}
                  className="pl-2 opacity-95 text-lg"
                >
                  <div className=" flex justify-between items-center mt-4">
                    {nav.name}
                    <IoIosArrowForward size={24} color={"#0f0f0f83"} />
                  </div>
                </Collapsible.Content>
              );
            })}
          </Collapsible.Root>
        ) : (
          <Link href={url} onClick={closeNav}>
            <li className=" px-4 py-2 text-xl ">{name}</li>
          </Link>
        )}
      </div>
    </>
  );
};

export const NavLinkForMobile2 = ({ categories, closeNav }) => {
  return (
    <>
      {/* Nav Links for mobile screen */}
      <ul className=" md:hidden font-lato">
        {categories.map((category, index) => {
          return (
            <Link href={category.url} key={index} onClick={closeNav}>
              <li className=" px-4 py-2 text-xl " key={index}>
                {category.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export const AuthButtonMobile = ({ closeNav }) => {
  const { userData } = useUser();
  const imageUrl = userData?.image?.formats?.thumbnail.url;

  const imageName = userData?.image?.name;

  const name = useInitialsName(userData?.username);
  return (
    <ul className=" font-lato border-t border-slate-300 mt-4 px-4 pt-5">
      {userData ? (
        <Link
          href={"/account/profile"}
          onClick={closeNav}
          className={`flex items-center gap-x-4 p-2 bg-c-gray2 rounded `}
        >
          {!userData?.image ? (
            <>
              <Image
                src={imageUrl}
                width={0}
                height={0}
                sizes={"100vw"}
                alt={imageName}
                className={" w-9 h-9 rounded-full bg-slate-300"}
              />
            </>
          ) : (
            <div className="  w-9 h-9 rounded-full bg-orange-500 flex justify-center items-center">
              <h1 className=" text-white font-lato font-medium">
                {name?.length <= 1 ? name[0] : name[0] + name[1]}
              </h1>
            </div>
          )}
          <h1>{userData?.username}</h1>
        </Link>
      ) : (
        <>
          <p className=" font-lato leading-snug text-lg mb-5 opacity-95">
            Become a Three member to grab the book super discount.
          </p>
          <div className=" flex gap-x-4">
            <Link
              href={"/signin"}
              onClick={closeNav}
              className=" flex items-center gap-2 bg-c-blue text-white rounded-full py-2 px-6 text-lg"
            >
              <li>Sign In</li>
            </Link>
            <Link
              href={"/signup"}
              onClick={closeNav}
              className=" flex items-center gap-2 border-c-blue border rounded-full py-2 px-6 text-lg"
            >
              <li>Join Us</li>
            </Link>
          </div>
        </>
      )}
    </ul>
  );
};
