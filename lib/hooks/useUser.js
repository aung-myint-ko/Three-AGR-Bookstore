import { getUserDetails } from "@/lib-api";
import { useAuthStore } from "@/lib-store/authStore";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  let userData;
  const { userId } = useAuthStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth-user", userId],
    queryFn: () => getUserDetails(userId),
  });

  if (isLoading || isError) {
    return { userData: null, isLoading, isError };
  }

  userData = data;
  return { userData, isLoading, isError };
};

export default useUser;
