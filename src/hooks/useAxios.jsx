import axios from "axios";

const instance = axios.create({
  baseURL: "https://tastio-server.vercel.app/",
});

const useAxios = () => {
  return instance;
};

export default useAxios;
