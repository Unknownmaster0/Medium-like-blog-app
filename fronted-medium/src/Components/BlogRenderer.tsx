import { BlogContent } from "./BlogContent";
import { BlogTitle } from "./BlogTitle";

export const BlogRenderer = ({
  title,
  content,
  author,
  publishedDate,
}: {
  title: string;
  content: string;
  author: string;
  publishedDate: string;
}) => {
  const nameArray = author.split(" ");
  let authorName;
  if (nameArray.length > 1) {
    authorName = nameArray[0][0] + nameArray[1][0];
  } else {
    authorName = nameArray[0][0];
  }

  return (
    <div className="sm:mt-4 mt-2 sm:p-3 p-1 sm:pb-4 pb:2 border-b border-slate-200">
      <div className="space-x-2 flex items-center">
        <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center">
          <span>{`${authorName}`}</span>
        </div>
        <div>{author}</div>
        <div className="text-xl text-gray-600 relative -top-1">
          <span>.</span>
        </div>
        <div>{publishedDate}</div>
      </div>
      <BlogTitle title={title} />
      <BlogContent content={content} />
      <div>{Math.ceil(content.length / 200) + ` minute(s)`}</div>
    </div>
  );
};
