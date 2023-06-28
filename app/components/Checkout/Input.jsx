import React from "react";

const Input = ({ title, placeholder, colSpan, register, slug, errors }) => {
  const errorMessage = errors[slug]?.message;

  return (
    <div className={`${colSpan && "md:col-span-2 md:w-1/2 md:max-w-[340px]"}`}>
      <label
        className=" capitalize font-medium md:text-lg opacity-80"
        htmlFor=""
      >
        {title}
      </label>
      <input
        {...register(slug)}
        type="text"
        className=" mt-1 placeholder:text-sm outline-none px-2 py-2 w-full bg-c-gray text-base opacity-80 border rounded-sm border-c-blue/20"
        placeholder={placeholder}
      />
      {errorMessage && (
        <p className="pt-1 font-lato text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
