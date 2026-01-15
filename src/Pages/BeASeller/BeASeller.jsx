import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import BtnPrimary from "../../Components/Buttons/BtnPrimary/BtnPrimary";
import Container from "../../Components/Container/Container";
import bg from "../../assets/bg.avif";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  AlertCircle,
  Check,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Store,
  UploadCloud,
} from "lucide-react";
import { uploadImage } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner/Spinner";
import { Link } from "react-router";

// --- Options for Cuisine ---
const cuisineOptions = [
  { value: "Biryani", label: "Biryani" },
  { value: "Kacchi", label: "Kacchi" },
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

// --- Custom Styles for React Select (Theme Compatible) ---
const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "var(--fallback-b1,oklch(var(--b1)/1))", // Matches base-100
    borderColor: state.isFocused
      ? "#07a061"
      : "var(--fallback-bc,oklch(var(--bc)/0.2))",
    borderRadius: "0.5rem",
    padding: "2px",
    boxShadow: state.isFocused ? "0 0 0 1px #07a061" : "none",
    "&:hover": { borderColor: "#07a061" },
    color: "var(--fallback-bc,oklch(var(--bc)/1))",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--fallback-b1,oklch(var(--b1)/1))", // Matches base-100
    zIndex: 50,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#07a061" : "#161F32",
    color: state.isFocused ? "white" : "inherit",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "inherit",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#07a061",
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "white",
    ":hover": {
      backgroundColor: "#057a4a",
      color: "white",
    },
  }),
};

const BeASeller = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const formRef = useRef(null);
  const [uploading, setUploading] = useState(false); // Loading state

  // Fetch Existing Application Status
  const {
    data: existingApp,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["seller-status", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/restaurants/status/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(existingApp);

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
    setUploading(true);
    const toastId = toast.loading("Processing application...");

    try {
      // 1. Image Upload to ImgBB
      const imageUrl = await uploadImage(data.image[0]);

      // 2. Extract values from react-select array
      const selectedCuisines = data.cuisine.map((item) => item.value);

      // 3. Prepare Payload
      const sellerRequest = {
        restaurantName: data.restaurantName,
        restaurantImage: imageUrl, // Use the uploaded URL
        location: data.location,
        phone: data.phone,
        cuisine: selectedCuisines,
        ownerName: user?.displayName,
        ownerEmail: user?.email,
        ownerPhoto: user?.photoURL,
        status: "pending",
        appliedDate: new Date().toISOString(),
      };

      // 4. Send to Backend
      const { data: responseData } = await axiosSecure.post(
        "/restaurants",
        sellerRequest
      );

      if (responseData.insertedId) {
        toast.success("Application Submitted! Wait for Admin approval.", {
          id: toastId,
        });
        reset();
      } else if (responseData.isExits) {
        toast.error(responseData.message, { id: toastId });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!", { id: toastId });
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-[calc(100vh-435px)] flex justify-center items-center">
        <Spinner />
      </div>
    );

  // 3. Status: PENDING
  if (existingApp?.status === "pending") {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center p-6 text-center space-y-6">
        <div className="bg-yellow-100 p-6 rounded-full">
          <Clock className="size-16 text-yellow-600" />
        </div>
        <h2 className="text-4xl font-bold">Application Under Review</h2>
        <p className="text-gray-500 max-w-lg text-lg">
          We have received your application for{" "}
          <span className="font-bold">{existingApp.restaurantName}</span>. Our
          admins are reviewing your details. Please check back later!
        </p>
        <Link to="/" className="btn btn-outline">
          Go Home
        </Link>
      </div>
    );
  }

  // 4. Status: VERIFIED (Already a Seller)
  if (existingApp?.status === "verified") {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center p-6 text-center space-y-6">
        <div className="bg-green-100 p-6 rounded-full">
          <CheckCircle className="size-16 text-green-600" />
        </div>
        <h2 className="text-4xl font-bold text-success">You are a Seller!</h2>
        <p className="text-gray-500 max-w-lg text-lg">
          Your restaurant{" "}
          <span className="font-bold">{existingApp.restaurantName}</span> is
          live. Go to your dashboard to manage foods and orders.
        </p>
        <Link to="/dashboard" className="btn btn-primary px-8">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  // 5. Status: REJECTED (Show Reason + Allow Re-apply)
  // We allow the form to render below, but show an alert at the top
  const isRejected = existingApp?.status === "rejected";

  return (
    <div>
      {/* --- HERO SECTION --- */}
      <section className="relative h-full min-h-[70vh] flex items-center bg-black/50">
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
                {isRejected ? "Re-Apply Now" : "Register Your Shop"}
              </BtnPrimary>
            </div>
          </div>
        </Container>
      </section>

      {/* --- REGISTRATION FORM SECTION --- */}
      <section ref={formRef} className="py-20 bg-base-200">
        <Container>
          {isRejected && (
            <div className="mb-10 bg-error/10 border border-error/20 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="bg-error p-3 rounded-full text-white shrink-0">
                <AlertCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-error">
                  Application Rejected
                </h3>
                <p className="text-base-content/70 mt-1">
                  Reason:{" "}
                  <span className="font-semibold">
                    {existingApp.rejectionReason}
                  </span>
                </p>
                <p className="text-sm mt-2 opacity-60">
                  You can fix the issues and submit the form below again.
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left Side: Info */}
            <div className="lg:w-1/3 space-y-6 mt-4">
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
            <div className="lg:w-2/3 w-full bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300">
              <h2 className="text-2xl font-bold mb-6 text-center text-primary">
                {isRejected ? "Update Application" : "Restaurant Application"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Restaurant Name */}
                <div className="form-control">
                  <label className="label font-semibold">Restaurant Name</label>
                  <label className="input input-bordered flex items-center gap-2 focus-within:outline-primary w-full">
                    <Store className="size-5 text-gray-400" />
                    <input
                      {...register("restaurantName", { required: true })}
                      type="text"
                      className="grow w-full"
                      placeholder="e.g. Sultan's Dine"
                    />
                  </label>
                  {errors.restaurantName && (
                    <span className="text-error text-xs mt-1">Required</span>
                  )}
                </div>

                {/* Restaurant Image Upload */}
                <div className="form-control">
                  <label className="label font-semibold">
                    Restaurant Cover Image
                  </label>
                  <div className="border-2 border-dashed border-base-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors bg-base-200/50">
                    <UploadCloud className="size-8 text-primary mb-2" />
                    <span className="text-sm font-medium">
                      Click to upload image
                    </span>
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      accept="image/*"
                      className="file-input file-input-ghost w-full max-w-xs mt-2"
                    />
                  </div>
                  {errors.image && (
                    <span className="text-error text-xs mt-1">
                      Image is required
                    </span>
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
                        placeholder="Select categories..."
                        styles={customStyles}
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
                    <label className="label font-semibold">Location</label>
                    <label className="input input-bordered flex items-center gap-2 focus-within:outline-primary w-full">
                      <MapPin className="size-5 text-gray-400" />
                      <input
                        {...register("location", { required: true })}
                        type="text"
                        className="grow"
                        placeholder="Dhanmondi, Dhaka"
                      />
                    </label>
                    {errors.location && (
                      <span className="text-error text-xs mt-1">Required</span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label font-semibold">
                      Contact Number
                    </label>
                    <label className="input input-bordered flex items-center gap-2 focus-within:outline-primary w-full">
                      <Phone className="size-5 text-gray-400" />
                      <input
                        {...register("phone", { required: true })}
                        type="number"
                        className="grow"
                        placeholder="017xxxxxxxx"
                      />
                    </label>
                    {errors.location && (
                      <span className="text-error text-xs mt-1">Required</span>
                    )}
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
                  <button
                    disabled={uploading}
                    className="btn btn-primary w-full text-lg font-bold"
                  >
                    {uploading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Submit Application"
                    )}
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
