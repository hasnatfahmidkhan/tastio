import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollOnTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollOnTop;
