import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: Date;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  // Converting UTC to Local Date
  const utcDate = new Date(publishedDate);
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
    <Link to={`/blog/${id}`} className="block w-full max-w-screen-md mx-auto ">
      <div className="p-5 border-b border-slate-200 pb-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 w-80 md:w-full max-w-screen-md mx-auto">
        <div className="flex items-center ">
          <Avatar name={authorName} />
          <div className="font-light pl-2 text-sm">{authorName}</div>
          <div className="flex items-center pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm">
            {localDate}
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold pt-2 break-words whitespace-normal ">
            {title.slice(0, 100)}
          </div>
          <div className="text-md font-normal text-gray-700 break-words whitespace-normal">
            {content.slice(0, 100)}
          </div>
          <div className="text-slate-500 text-sm font-normal pt-4 break-words whitespace-normal">
            {`${Math.ceil(content.length / 600)} min read`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-gray-600 dark:text-gray-300`}
      >
        {name[0]}.
      </span>
    </div>
  );
}
