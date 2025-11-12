import { Outlet, useLocation } from "react-router";
import Container from "../Components/Container/Container";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollOnTop from "../Components/ScrollOnTop/ScrollOnTop";
import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner/Spinner";

const Root = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
    }, 2500);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [pathname]);

  if (preloader) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-center min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        ) : (
          <Container>
            <Outlet />
          </Container>
        )}
        <ScrollOnTop />
      </main>
      <Footer />
    </section>
  );
};

export default Root;
