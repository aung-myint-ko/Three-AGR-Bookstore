import Account from "@/components-account/Account";

export const metadata = {
  title: "Profile",
};

const page = () => {
  return (
    <>
      <Account profile={true} />
    </>
  );
};

export default page;
