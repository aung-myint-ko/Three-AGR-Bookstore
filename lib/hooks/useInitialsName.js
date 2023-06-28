const useInitialsName = (name) => {
  const words = name?.split(" ");
  let initials = "";
  if (words) {
    for (let i = 0; i < words.length; i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase();
  }
};

export default useInitialsName;
