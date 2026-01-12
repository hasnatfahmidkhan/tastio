import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],

    enabled: !authLoading && !!user?.email,

    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}/role`);
      return data?.role;
    },
  });

  return [role, roleLoading];
};

export default useRole;
