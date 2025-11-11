import { Outlet } from "react-router";
import Container from "../Components/Container/Container";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollOnTop from "../Components/ScrollOnTop/ScrollOnTop";

const Root = () => {
  return (
    <section className="flex flex-col justify-center min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <ScrollOnTop />
      <Footer />
    </section>
  );
};

export default Root;
