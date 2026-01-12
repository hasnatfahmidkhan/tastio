import { useQuery } from "@tanstack/react-query";
import Container from "../../Components/Container/Container";
import useAxios from "../../hooks/useAxios";
import Spinner from "../../Components/Spinner/Spinner";
import { ChessQueen, CircleStar, Medal } from "lucide-react";
import Heading from "../../Components/Heading/Heading";

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
    if (count >= 50) return <span className="badge badge-warning">Master</span>;
    if (count >= 20)
      return <span className="badge badge-secondary">Critic</span>;
    return <span className="badge badge-ghost">Foodie</span>;
  };

  console.log(allreviewers);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Spinner />
      </div>
    );
  }
  return (
    <Container>
      <div className="overflow-x-auto w-full my-5">
        <Heading
          title="Top"
          subtitle="Reviewers 🏆"
          className="text-center mb-10"
        />
        <table className="table w-full border border-gray-300 rounded-lg overflow-hidden">
          {/* Head */}
          <thead className="bg-primary text-white text-lg">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Badge</th>
              <th>Total Reviews</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {allreviewers.map((user, index) => (
              <tr key={user.email} className="hover">
                <th>
                  {index + 1 === 1 ? (
                    <ChessQueen className="text-yellow-400" />
                  ) : index + 1 === 2 ? (
                    <Medal className="text-teal-400" />
                  ) : index + 1 === 3 ? (
                    <CircleStar className="text-orange-400" />
                  ) : (
                    index + 1
                  )}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.photo || "/profile.png"}
                          onError={(e) => {
                            e.currentTarget.src = "./profile.png";
                          }}
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{getBadge(user.reviewCount)}</td>
                <td className="font-bold text-primary text-lg">
                  {user.totalReviews} Reviews
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Button can go here */}
      </div>
    </Container>
  );
};

export default Leaderboard;
