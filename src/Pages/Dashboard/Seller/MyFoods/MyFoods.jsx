import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Edit, Trash2, DollarSign } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Spinner from "../../../../Components/Spinner/Spinner";

const MyFoods = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: foods = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-foods", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/menu/seller/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center h-[calc(100vh-150px)] items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        My Menu Items{" "}
        <span className="badge badge-primary badge-lg">{foods.length}</span>
      </h2>

      {foods.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-400">
            No items added yet!
          </h3>
          <Link to="/dashboard/add-food" className="btn btn-primary mt-4">
            Add Your First Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 group"
            >
              <figure className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 badge badge-secondary font-bold shadow-md">
                  {item.category}
                </div>
              </figure>
              <div className="card-body p-5">
                <h2 className="card-title text-lg font-bold">{item.name}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 text-primary font-bold text-xl my-2">
                  <DollarSign size={20} /> {item.price}
                </div>
                <div className="card-actions justify-end mt-2 pt-4 border-t border-base-200">
                  <Link to={`/dashboard/update-food/${item._id}`}>
                    <button className="btn btn-sm btn-ghost hover:bg-primary hover:text-white transition-colors">
                      <Edit size={16} /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm btn-ghost text-error hover:bg-error hover:text-white transition-colors"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFoods;
