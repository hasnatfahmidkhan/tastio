import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import ReviewForm from "../../Components/ReviewForm/ReviewForm";
import BackBtn from "../../Components/BackBtn/BackBtn";
import { useRef } from "react";

const AddReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const formRef = useRef();

  const handleAddReview = (data) => {
    axiosSecure
      .post("/reviews", {
        ...data,
        postedAt: new Date().toISOString(),
        reviewerName: user?.displayName,
        reviewerEmail: user?.email,
      })
      .then(({ data }) => {
        if (data.insertedId) {
          toast.success("Review Added Succesfully");
          formRef.current?.resetForm();
        }
      });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
      <div className="mb-3 space-y-1">
        <h3 className="text-4xl text-base-content font-bold">
          <span className="text-primary">Add</span> Review
        </h3>
        <BackBtn />
      </div>
      <ReviewForm ref={formRef} handleReview={handleAddReview}>
        Add Review
      </ReviewForm>
    </section>
  );
};

export default AddReview;
