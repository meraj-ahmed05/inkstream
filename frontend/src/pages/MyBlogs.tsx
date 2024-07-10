import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useMyBlogs } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";

export const MyBlogs = () => {
  const { loading, blogs } = useMyBlogs();
  const [deleteBlogId, setDeleteBlogId] = useState("");

  async function handleDelete(id: string) {
    try {
      const ans = window.confirm("Do you want to delete this post");
      if (ans) {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `${BACKEND_URL}/api/v1/blog/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        console.log(response.data);
        if (response.data) setDeleteBlogId(id);
        else alert("Deletion Unsuccessfull");
      }
    } catch (error) {
      alert("Deletion Unsuccessfull");
    }
  }
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  const filteredBlogs = blogs.filter((blog) => blog.id !== deleteBlogId);
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pb-10">
        <div className="w-full">
          {filteredBlogs.map((blog) => (
            <div
              className=" w-full max-w max-w-screen-md mx-auto"
              key={blog.id}
            >
              <BlogCard
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.issuedOn}
              />
              <div className="flex flex-row-reverse space-x-8 pt-2">
                <Link
                  to={`/edit/${blog.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-4 ml-4"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => {
                    handleDelete(blog.id as string);
                  }}
                  className="text-red-500 hover:text-red-700 pr-4"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
