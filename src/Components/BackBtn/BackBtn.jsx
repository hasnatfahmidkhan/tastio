import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const BackBtn = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center w-full gap-1.5 cursor-pointer hover:text-accent transition-colors duration-200 font-medium tracking-wide ${className} px-1 py-2`}
    >
      <FaArrowLeft />
      <span>Go Back</span>
    </button>
  );
};

export default BackBtn;
