import { Link } from "react-router-dom";
import { BlogContent } from "./BlogContent";
import { BlogTitle } from "./BlogTitle";

export const BlogRenderer = ({
  id,
  title,
  content,
  author,
  createdAt,
}: {
  id: string,
  title: string;
  content: string;
  author: string;
  createdAt: string;
}) => {
  const nameArray = author.split(" ");
  let authorName;
  if (nameArray.length > 1) {
    authorName = nameArray[0][0] + nameArray[1][0];
  } else {
    authorName = nameArray[0][0];
  }

  return (
    <div className="sm:mt-4 mt-2 sm:p-3 p-1 sm:pb-4 pb:2 border-b-2 border-slate-200">
      <div className="space-x-2 flex items-center">
        <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center text-sm">
          <span>{`${authorName}`}</span>
        </div>
        <div>{author}</div>
        <div className="text-xl text-gray-600 relative -top-1">
          <span>.</span>
        </div>
        <div>{createdAt}</div>
      </div>
      <Link to={`/blog/${id}`}>
        <div className="cursor-pointer">
          <BlogTitle title={title} />
          <BlogContent content={content} />
        </div>
      </Link>
      <div>{Math.ceil(content.length / 200) + ` minute(s)`}</div>
    </div>
  );
};
