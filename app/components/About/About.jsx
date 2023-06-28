import React from "react";
import Image from "next/image";
import Shop1 from "@/public-images/shop1.jpg";
import Shop2 from "@/public-images/shop2.jpg";
import BreadCrumb from "@/components-assest/BreadCrumb";

const About = () => {
  return (
    <div className=" px-4 md:px-20 py-10 md:py-14">
      <BreadCrumb />
      <h1 className=" text-center font-josefin font-bold text-2xl md:text-3xl mt-5 mb-3 md:mb-5">
        About Us
      </h1>
      <div className=" flex flex-col-reverse lg:flex-row gap-x-6 ">
        <div className=" basis-1/4 flex flex-col md:flex-row lg:flex-col gap-3 mt-4 lg:mt-0">
          <AboutImage url={Shop1} branch={"Bogyoke Branch"} />
          <AboutImage url={Shop2} branch={"Time City Branch"} />
        </div>
        <div className=" basis-3/4 font-lato opacity-70 ">
          <p className="mb-3">
            Waterstones began in 1982 under the aegis of its founder, Tim
            Waterstone. Over the decades that have followed, we have grown to
            become an icon of the British cultural landscape, employing over
            3000 superb booksellers across over 280 bookshops.
          </p>
          <p className="mb-3">
            As the last surviving national bookshop chain, under the
            helmsmanship of Managing Director James Daunt, we are proud to have
            fought off the perceived threat of e-readers and online competition
            to begin a programme of active expansion. Recent years have seen
            fresh shops open around the country and sites either move or be
            upgraded. With recent openings including Reigate, Clifton and moves
            to far more attractive locations for our shops in Edinburgh and
            Manchester’s Trafford Centre, our plans continue to be ambitious.
          </p>
          <p className="mb-3">
            Perhaps unusually for a national retailer, our branch managers enjoy
            a high degree of individual autonomy, running their shops to best
            please their local customers, with only the lightest of central
            suggested direction. We take enormous pleasure in championing simply
            good (but sometimes relatively overlooked) books, a principle that
            began most famously with John Williams’ Stoner, a quiet, intense
            novel that we turned into a bestseller forty years after its
            original publication.
          </p>
          <p className="mb-3">
            Working closely with our bookshops are our efforts online, where at
            Waterstones.com we are working to bring the very essence of
            Waterstones to every home and smartphone in Britain. With hugely
            popular endeavours such as our regular reading update Waterstones
            Weekly and an ever-increasing offering of exclusive reader offers
            and signed editions, Waterstones.com is the perfect online companion
            to our High Street bookshops. Click & Collect – the service that
            links the two – has grown in tandem with our success, allowing our
            customers to experience the best of both worlds
          </p>
        </div>
      </div>
    </div>
  );
};

const AboutImage = ({ url, branch }) => {
  return (
    <div>
      <div className="w-full h-[200px] max-h-[200px] mb-1 bg-slate-200  rounded-sm">
        <Image
          src={url}
          alt="agr-about-us"
          width={0}
          height={0}
          sizes="100w"
          className=" w-full h-full"
          priority
        />
      </div>
      <p className=" italic opacity-80 font-lato ">{branch}</p>
    </div>
  );
};

export default About;
