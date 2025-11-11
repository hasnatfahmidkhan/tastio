import Lottie from "lottie-react";
import errorPage from "../../assets/errorpage.json";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-center min-h-screen bg-secondary">
      <Lottie
        animationData={errorPage}
        loop={true}
        className="w-4xl h-full relative"
      >
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary absolute bottom-5 left-[50%] translate-x-[-50%]"
        >
          <FaArrowLeft />
          Go Back
        </button>
      </Lottie>
    </section>
  );
};

export default ErrorPage;
