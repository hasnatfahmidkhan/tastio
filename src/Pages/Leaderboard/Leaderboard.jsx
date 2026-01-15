import { useQuery } from "@tanstack/react-query";
import Container from "../../Components/Container/Container";
import useAxios from "../../hooks/useAxios";
import Spinner from "../../Components/Spinner/Spinner";
import { Trophy, Medal, Award, Crown } from "lucide-react";

const Leaderboard = () => {
  const axiosInstance = useAxios();
  const { data: allreviewers = [], isLoading } = useQuery({
    queryKey: ["all-reviewers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`leaderboard`);
      return data;
    },
  });

  // Badge Function
  const getBadge = (count) => {
    if (count >= 50)
      return (
        <div className="badge badge-warning gap-1 p-3">
          <Crown size={14} /> Master
        </div>
      );
    if (count >= 20)
      return (
        <div className="badge badge-secondary gap-1 p-3">
          <Award size={14} /> Critic
        </div>
      );
    return <div className="badge badge-ghost p-3">Foodie</div>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-yellow-100 text-yellow-600 rounded-full mb-4">
          <Trophy size={32} />
        </div>
        <h1 className="text-4xl font-bold text-base-content mb-2">
          Top Contributors
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Meet the foodies who help our community discover the best tastes.
        </p>
      </div>

      <div className="overflow-x-auto w-full bg-base-100 shadow-xl rounded-2xl border border-base-200">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-base-200/50 text-base-content font-bold text-sm uppercase tracking-wider">
            <tr>
              <th className="py-4 pl-6">Rank</th>
              <th className="py-4">User Profile</th>
              <th className="py-4">Status</th>
              <th className="py-4 pr-6 text-right">Contributions</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody className="divide-y divide-base-200">
            {allreviewers.map((user, index) => (
              <tr
                key={user.email}
                className="hover:bg-base-200/30 transition-colors"
              >
                <th className="pl-6">
                  {index + 1 === 1 ? (
                    <Trophy
                      className="text-yellow-500 fill-yellow-500"
                      size={24}
                    />
                  ) : index + 1 === 2 ? (
                    <Medal className="text-gray-400 fill-gray-400" size={24} />
                  ) : index + 1 === 3 ? (
                    <Award
                      className="text-orange-500 fill-orange-500"
                      size={24}
                    />
                  ) : (
                    <span className="font-mono text-lg text-gray-400">
                      #{index + 1}
                    </span>
                  )}
                </th>
                <td>
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div
                        className={`mask mask-squircle w-12 h-12 ${
                          index < 3 ? "ring ring-primary ring-offset-2" : ""
                        }`}
                      >
                        <img
                          loading="lazy"
                          src={user.photo || "/profile.png"}
                          onError={(e) => {
                            e.currentTarget.src = "./profile.png";
                          }}
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-base">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{getBadge(user.totalReviews)}</td>
                <td className="pr-6 text-right">
                  <div className="font-bold text-primary text-lg">
                    {user.totalReviews}
                  </div>
                  <div className="text-xs text-gray-400">Reviews</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Leaderboard;
