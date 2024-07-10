import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";
import { useBlog } from "../hooks";
import { FullBlogSkeleton } from "../components/FullblogSkeleton";

export const Edit = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setDescription(blog.content || "");
    }
  }, [blog]);

  if (loading) {
    return <FullBlogSkeleton />;
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8 px-4 md:px-8">
        <div className="max-w-screen-lg w-full">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Title"
          />
          <TextEditor
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={async () => {
              const token = localStorage.getItem("token");
              const response = await axios.put(
                `${BACKEND_URL}/api/v1/blog/edit`,
                {
                  title,
                  content: description,
                  id,
                },
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              value={value}
              onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
              placeholder={"Write an article..."}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
