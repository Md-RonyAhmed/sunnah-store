import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import usePrivateAxios from "./usePrivateAxios";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPrivateInstance = usePrivateAxios();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      // console.log('asking or checking is admin', user)
      const res = await axiosPrivateInstance.get(`users/admin/${user.email}`);
      // console.log(res.data);
      return res?.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
