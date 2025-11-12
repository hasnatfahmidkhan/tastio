import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "https://tastio-server.vercel.app/",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      async (config) => {
        const token = await user.getIdToken(/* forceRefresh */ true);

        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return instance;
};

export default useAxiosSecure;
