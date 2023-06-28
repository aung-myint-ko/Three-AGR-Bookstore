"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserDetails } from "@/lib-api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToastStore } from "@/lib-store/toastStore";
import useUser from "@/lib-hook/useUser";
import useInitialsName from "@/lib-hook/useInitialsName";

const Profile = () => {
  const { userData, isLoading, isError } = useUser();
  const { setToast } = useToastStore();
  const [editUser, setEditUser] = useState({
    username: "",
    email: "",
    bio: "",
    image: "",
  });
  const [selectedImgFile, setSelectedImgFile] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    setEditUser({
      username: userData?.username,
      email: userData?.email,
      bio: userData?.bio,
    });
  }, [userData]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUserDetails,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["auth-user", userData?.id],
      });
      setIsFormChanged(false);
      setToast({
        status: "success",
        message: `Your profile has been updated.`,
      });
    },
  });

  const handleSubmit = () => {
    setIsFormChanged("loading");
    const formData = new FormData();
    formData.append("files", selectedImgFile);

    // Create new obj for edituser by removing null property
    const filterObj = Object.keys(editUser).reduce((acc, key) => {
      if (editUser[key]) {
        acc[key] = editUser[key];
      }
      return acc;
    }, {});

    mutation.mutate({
      imageFile: selectedImgFile ? formData : null,
      id: userData?.id,
      editedUser: filterObj,
    });
  };

  return (
    <div className=" basis-0 md:basis-5/6">
      <Avatar
        setSelectedImgFile={setSelectedImgFile}
        image={userData?.image?.url}
        username={editUser.username}
        setIsFormChanged={setIsFormChanged}
      />
      <div className=" mt-8 md:mt-10">
        <Input
          editUser={editUser}
          setEditUser={setEditUser}
          title={"username"}
          userData={userData?.username}
          setIsFormChanged={setIsFormChanged}
        />
        <Input
          editUser={editUser}
          setEditUser={setEditUser}
          title={"email"}
          userData={userData?.email}
          setIsFormChanged={setIsFormChanged}
        />
        <Input
          editUser={editUser}
          setEditUser={setEditUser}
          title={"bio"}
          userData={userData?.bio}
          setIsFormChanged={setIsFormChanged}
          textarea={true}
        />
        {isFormChanged && (
          <button
            onClick={handleSubmit}
            className={`flex justify-center items-center gap-x-3 px-8 py-2 rounded-sm font-lato font-medium text-lg text-white bg-c-blue/90 hover:bg-c-blue hover:shadow `}
          >
            {isFormChanged == "loading" ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" /> Save
                Profile
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const Avatar = ({ setSelectedImgFile, image, username, setIsFormChanged }) => {
  //For image preview
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  //Get user selected image file path
  const TraceImageUrl = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImageUrl(reader.result);
      };
      setSelectedImgFile(file);
      setIsFormChanged(true);
    }
  };

  const name = useInitialsName(username ? username : "user");

  return (
    <div className=" flex flex-col md:flex-row md:items-center gap-y-8 md:gap-x-10 ">
      <div className="mx-auto md:mx-0 relative w-[200px] h-[200px] rounded-full overflow-hidden shadow-md group cursor-pointer ">
        {image || selectedImageUrl ? (
          <Image
            src={selectedImageUrl ? selectedImageUrl : image}
            alt="customer"
            fill
            sizes="100vw"
            className="bg-slate-300"
            priority
          />
        ) : (
          <div className=" w-full h-full bg-orange-500 flex justify-center items-center">
            <h1 className=" text-white font-lato text-6xl font-medium">
              {name.length <= 1 ? name[0] : name[0] + name[1]}
            </h1>
          </div>
        )}
        <div className=" duration-300 ease-linear transition-all group-hover:opacity-100 opacity-0 flex justify-center items-center absolute top-0 left-0 w-[200px] h-[200px] rounded-full overflow-hidden bg-black/30">
          <AiOutlineCamera size={70} className=" text-white" />
          <input
            type="file"
            onChange={TraceImageUrl}
            className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[90%] rounded-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <div>
        <h1 className=" font-josefin text-4xl mb-3 md:mb-4">{username}</h1>
        <button
          disabled
          className=" font-lato px-5 py-1 rounded-full bg-c-yellow/50 text-c-blue font-medium tracking-wide"
        >
          Top Buyer
        </button>
      </div>
    </div>
  );
};

const Input = ({
  editUser,
  setEditUser,
  title,
  textarea,
  setIsFormChanged,
}) => {
  const { userData } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
    // Check if the field value is different from the initial value
    if (value !== userData[name]) {
      setIsFormChanged(true);
    } else {
      setIsFormChanged(false);
    }
  };
  return (
    <div
      className={` font-lato flex flex-col md:flex-row gap-y-2 md:gap-x-10 border-b border-black/20 pb-5 mb-3 md:mb-5`}
    >
      <label
        className=" basis-1/4 capitalize font-medium text-lg opacity-80"
        htmlFor=""
      >
        {title}
      </label>
      {textarea ? (
        <textarea
          className=" basis-3/4 md:basis-2/4 resize-none border border-c-blue/40 rounded outline-none px-4 py-2 w-full bg-c-gray text-base "
          name="bio"
          rows="3"
          value={editUser[title]}
          onChange={handleChange}
        ></textarea>
      ) : (
        <input
          type={"text"}
          name={title}
          value={editUser[title]}
          onChange={handleChange}
          className=" basis-3/4 md:basis-2/4 border border-c-blue/40 rounded outline-none px-4 py-2 w-full bg-c-gray text-base "
        />
      )}
    </div>
  );
};

export default Profile;
