import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullblogSkeleton";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading || !blog) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <FullBlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
