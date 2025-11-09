import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const AddReview = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
      <div className="mb-3 space-y-1">
        <h3 className="text-4xl text-base-content font-bold">
          <span className="text-primary">Add</span> Review
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-full gap-1.5 cursor-pointer hover:text-base-300 transition-colors duration-200 font-medium tracking-wide "
        >
          <FaArrowLeft />
          <span>Back To Reviews</span>
        </button>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 p-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100">
        <form>
          <fieldset className="fieldset p-2 gap-4">
            <div>
              <label className="label text-sm">Food Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Food Name"
              />
            </div>
            <div>
              <label className="label text-sm">Food Image</label>
              <input
                type="text"
                className="form-input"
                placeholder="Food Image"
              />
            </div>
            <div>
              <label className="label text-sm">Restaurant Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Restaurant Name"
              />
            </div>
            <div>
              <label className="label text-sm">Location</label>
              <input
                type="text"
                className="form-input"
                placeholder="Location"
              />
            </div>

            <div>
              <label className="label text-sm">Email</label>
              <input type="text" className="form-input" placeholder="Email" />
            </div>

            <div className="flex flex-col">
              <label className="label text-sm">Review Text</label>
              <textarea
                rows={6}
                className="border border-gray-300 rounded-sm focus:border-primary focus:outline-none p-3 text-sm"
                placeholder="Review Text"
              ></textarea>
            </div>

            <button className="btn btn-primary mt-2">Add Review</button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default AddReview;
