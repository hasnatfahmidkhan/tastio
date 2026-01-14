import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Trash2, UserCheck, Shield, Search } from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  // Fetch Users with Search & Filter
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", search, filterRole],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${search}&role=${filterRole}`
      );
      return res.data;
    },
  });

  // Handle Role Change
  const handleRoleUpdate = (user, newRole) => {
    Swal.fire({
      title: `Make ${user.name} a ${newRole}?`,
      text: `This will give them ${newRole} access.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#07a061",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/role/${user._id}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              toast.success(`${user.name} is now an ${newRole}!`);
            }
          });
      }
    });
  };

  // Handle Delete
  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">
          Manage Users <span className="text-primary">({users.length})</span>
        </h2>

        {/* Search & Filter Group */}
        <div className="flex gap-2 w-full md:w-1/3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by name/email"
              className="input input-bordered pl-10 w-full max-w-xs"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
          <select
            className="select select-bordered"
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-base-200 text-base font-bold">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              user.photo || "https://i.ibb.co/1M8x6yv/user.png"
                            }
                            alt="User"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <div className="badge badge-primary badge-outline font-bold gap-1">
                        <Shield size={12} /> Admin
                      </div>
                    ) : user.role === "seller" ? (
                      <div className="badge badge-secondary badge-outline font-bold">
                        Seller
                      </div>
                    ) : (
                      <div className="badge badge-ghost font-bold">User</div>
                    )}
                  </td>
                  <td>
                    <div className="dropdown dropdown-hover dropdown-right">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-xs btn-ghost border border-gray-300"
                      >
                        Change Role
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 border border-base-200"
                      >
                        <li>
                          <a onClick={() => handleRoleUpdate(user, "admin")}>
                            Make Admin
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleRoleUpdate(user, "user")}>
                            Make User
                          </a>
                        </li>
                        {/* Seller role usually comes from application, but admin can force it */}
                        <li>
                          <a onClick={() => handleRoleUpdate(user, "seller")}>
                            Make Seller
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost btn-sm text-error hover:bg-red-50"
                      disabled={user.role === "admin"} // Cannot delete admin
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
