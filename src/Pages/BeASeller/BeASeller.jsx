import { useRef } from "react";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import Select from "react-select"; // Import React Select
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import BtnPrimary from "../../Components/Buttons/BtnPrimary/BtnPrimary";
import Container from "../../Components/Container/Container";
import bg from "../../assets/bg.avif";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Check } from "lucide-react";

// --- Options for Cuisine ---
const cuisineOptions = [
  { value: "Biryani", label: "Biryani" },
  { value: "Fast Food", label: "Fast Food" },
  { value: "Burger", label: "Burger" },
  { value: "Pizza", label: "Pizza" },
  { value: "Chinese", label: "Chinese" },
  { value: "Bengali", label: "Bengali" },
  { value: "Indian", label: "Indian" },
  { value: "Thai", label: "Thai" },
  { value: "Dessert", label: "Dessert" },
  { value: "Coffee & Juice", label: "Coffee & Juice" },
  { value: "Street Food", label: "Street Food" },
];

const BeASeller = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const formRef = useRef(null);

  // Destructure control from useForm
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cuisine: [],
      restaurantName: "",
      location: "",
      phone: "",
    },
  });

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data) => {
    // 1. Extract values from react-select array
    const selectedCuisines = data.cuisine.map((item) => item.value);

    // 2. Prepare Payload
    const sellerRequest = {
      restaurantName: data.restaurantName,
      restaurantImage: data.restaurantImage,
      location: data.location,
      phone: data.phone,
      cuisine: selectedCuisines, // Array of strings e.g. ["Burger", "Pizza"]
      ownerName: user?.displayName,
      ownerEmail: user?.email,
      ownerPhoto: user?.photoURL,
      status: "pending",
      appliedDate: new Date().toISOString(),
    };

    try {
      const { data } = await axiosSecure.post("/restaurants", sellerRequest);
      if (data.isExits) {
        toast.success(data.message);
        reset();
      }
      if (data.insertedId) {
        toast.success("Application Submitted! Wait for Admin approval.");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div>
      {/* --- HERO SECTION --- */}
      <section className="relative h-full min-h-[70vh] flex items-center bg-black/40">
        <img
          src={bg}
          alt="Be a Seller"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <Container className="relative z-10 w-full">
          <div className="max-w-2xl text-white py-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Grow your business <br /> with{" "}
              <span className="text-primary">Tastio</span>
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-lg">
              Partner with us for free, list your menu, manage reviews, and
              reach thousands of hungry customers instantly!
            </p>
            <div onClick={handleScrollToForm}>
              <BtnPrimary className="border-none px-8 text-lg">
                Register Your Shop
              </BtnPrimary>
            </div>
          </div>
        </Container>
      </section>

      {/* --- REGISTRATION FORM SECTION --- */}
      <section ref={formRef} className="py-20 bg-base-200">
        <Container>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left Side: Info */}
            <div className="md:w-1/3 space-y-6 mt-4">
              <h3 className="text-3xl font-bold text-base-content">
                Why join us?
              </h3>
              <ul className="space-y-4 text-base-content/70">
                <li className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-600 p-2 rounded-full">
                    <Check className="size-5" />
                  </span>
                  <span>Free digital menu & profile</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-600 p-2 rounded-full">
                    <Check className="size-5" />
                  </span>
                  <span>Direct reply to customer reviews</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-full">
                    <Check className="size-5" />
                  </span>
                  <span>Access to sales analytics</span>
                </li>
              </ul>
            </div>

            {/* Right Side: The Form */}
            <div className="md:w-2/3 w-full bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300">
              <h2 className="text-2xl font-bold mb-6 text-center text-primary">
                Restaurant Application
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Restaurant Name */}
                <div className="form-control">
                  <label className="label font-semibold">Restaurant Name</label>
                  <input
                    {...register("restaurantName", { required: true })}
                    type="text"
                    placeholder="e.g. Sultan's Dine"
                    className="input input-bordered w-full focus:input-primary"
                  />
                  {errors.restaurantName && (
                    <span className="text-error text-xs mt-1">Required</span>
                  )}
                </div>
                {/* Restaurant Image */}
                <div className="form-control">
                  <label className="label font-semibold">
                    Restaurant Image
                  </label>
                  <input
                    {...register("restaurantImage", { required: true })}
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className="input input-bordered w-full focus:input-primary"
                  />
                  {errors.restaurantImage && (
                    <span className="text-error text-xs mt-1">Required</span>
                  )}
                </div>

                {/* Cuisine Type (React Select) */}
                <div className="form-control">
                  <label className="label font-semibold">
                    Cuisine Type (Select Multiple)
                  </label>
                  <Controller
                    name="cuisine"
                    control={control}
                    rules={{ required: "Please select at least one cuisine" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={cuisineOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select categories (e.g. Burger, Pizza)"
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            backgroundColor: "#1f2937", // dark background
                            borderColor: state.isFocused
                              ? "#07a061"
                              : "#e5e7eb",
                            borderRadius: "0.5rem",
                            padding: "2px",
                            "&:hover": { borderColor: "#07a061" },
                            color: "#fff",
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: "#07a061", // tag background
                            color: "#fff",
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: "#fff",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#1f2937", // dropdown background
                            color: "#fff",
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused
                              ? "#065f46" // hover/focus option
                              : "#1f2937",
                            color: "#fff",
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: "#fff",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#9ca3af",
                          }),
                        }}
                      />
                    )}
                  />

                  {errors.cuisine && (
                    <span className="text-error text-xs mt-1">
                      {errors.cuisine.message}
                    </span>
                  )}
                </div>

                {/* Location & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label font-semibold">
                      Location / Address
                    </label>
                    <input
                      {...register("location", { required: true })}
                      type="text"
                      placeholder="e.g. 2/A Dhanmondi, Dhaka"
                      className="input input-bordered w-full focus:input-primary"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label font-semibold">
                      Contact Number
                    </label>
                    <input
                      {...register("phone", { required: true })}
                      type="number"
                      placeholder="017xxxxxxxx"
                      className="input input-bordered w-full focus:input-primary"
                    />
                  </div>
                </div>

                {/* Owner Email */}
                <div className="form-control">
                  <label className="label font-semibold">Owner Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-base-200 cursor-not-allowed opacity-70"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button className="btn btn-primary w-full text-lg font-bold">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default BeASeller;
