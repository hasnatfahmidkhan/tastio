import { Outlet } from "react-router";
import Container from "../Components/Container/Container";
import Navbar from "../Components/Navbar/Navbar";

const Root = () => {
  return (
    <section className="flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <Container>
        <main className="flex-1">
          <Outlet />
        </main>
      </Container>
      {/* footer  */}
    </section>
  );
};

export default Root;
