import Lottie from "lottie-react";
import errorPage from "../../assets/errorpage.json";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-center min-h-screen bg-secondary relative">
      <Lottie animationData={errorPage} loop={true} className="w-4xl h-full" />
      <button
        onClick={() => navigate(-1)}
        className="btn btn-primary absolute top-[75%] left-1/2 -translate-x-1/2"
      >
        <FaArrowLeft className="mr-2" />
        Go Back
      </button>
    </section>
  );
};

export default ErrorPage;
