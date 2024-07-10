import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const utcDate = new Date(blog.issuedOn);
  const userLocale = navigator.language || navigator.languages[0];
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const localDate = new Intl.DateTimeFormat(userLocale, options).format(
    utcDate
  );

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full max-w-screen-xl px-4 md:px-10 pt-12 pb-10">
          <div className="lg:col-span-8">
            <div className="text-2xl md:text-3xl lg:text-5xl font-extrabold break-words">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-5 text-sm md:text-base lg:text-lg">
              Published on {localDate}
            </div>
            <div className="pt-4 pb-5 text-sm md:text-base lg:text-lg break-words">
              {blog.content}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex items-center w-full pt-4">
              <div className="pr-4">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Join us in exploring narratives that Captivate and Inspire
                  <div className="pt-2 text-slate-500">
                    start writing now with Inkstream
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
