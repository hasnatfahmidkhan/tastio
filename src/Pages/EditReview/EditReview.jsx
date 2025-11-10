import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import ReviewForm from "../../Components/ReviewForm/ReviewForm";
import BackBtn from "../../Components/BackBtn/BackBtn";
import toast from "react-hot-toast";

const EditReview = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const getReview = async () => {
    const res = await axiosSecure.get(`/reviews/${id}`);
    return res.status === 200 ? res.data : [];
  };

  const { data } = useQuery({
    queryKey: ["reviews", id],
    queryFn: getReview,
  });

  const handleEditReview = async (data) => {
    const res = await axiosSecure.patch(`/reviews/${id}`, { ...data });
    if (res.status === 200) {
      toast.success("Review Update Succesfully");
      navigate(-1);
    } else {
      toast.error("Review does not update");
    }
  };
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
      <div className="mb-3 space-y-1">
        <h3 className="text-4xl text-base-content font-bold">
          <span className="text-primary">Edit</span> Review
        </h3>
        <BackBtn />
      </div>
      <ReviewForm handleReview={handleEditReview} review={data}>
        Update Review
      </ReviewForm>
    </section>
  );
};

export default EditReview;
