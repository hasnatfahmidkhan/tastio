import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://tastio-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signoutFunc } = useAuth();
  const navigate = useNavigate();
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

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          signoutFunc().then(() => {
            navigate("/login");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, signoutFunc]);

  return instance;
};

export default useAxiosSecure;
