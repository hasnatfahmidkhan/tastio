import Container from "../../Components/Container/Container";
import PostCard from "../../Components/PostCard/PostCard";

const Feed = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </Container>
  );
};

export default Feed;
