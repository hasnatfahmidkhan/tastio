import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center justify-center w-full gap-1.5 cursor-pointer hover:text-base-300 transition-colors duration-200 font-medium tracking-wide "
    >
      <FaArrowLeft />
      <span>Back To Reviews</span>
    </button>
  );
};

export default BackBtn;
