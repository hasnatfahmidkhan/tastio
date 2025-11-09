import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user.accessToken;

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);
  return instance;
};

export default useAxiosSecure;
