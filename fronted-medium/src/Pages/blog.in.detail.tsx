import { useParams } from "react-router-dom";
import { useBlogId } from "../hooks/blog.fetch";
import { Loading } from "../Components/Loading";
import { NavBar } from "../Components/NavBar";

export const BlogDetail = () => {
  const { id } = useParams();
  console.log(`id: ${id}`);
  //   if id is not available
  if (!id) return <Loading msg="Something went wrong" />;

  const { loading, blog } = useBlogId({ id });

  if (loading) {
    return <Loading msg={"Your content is loading"} />;
  }

  return (
    <div>
      <NavBar input={false}/>
      <div className="sm:p-4 p-2 flex justify-center items-center w-screen">
        <div className="sm:w-1/2">
          {blog && (
            <div className="space-y-4">
              <div className="md:text-4xl font-bold text-lg text-pretty">
                {blog.title}
              </div>
              <div className="space-x-2 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex justify-center items-center text-sm">
                  <span>{`${blog.author.name[0]}`}</span>
                </div>
                <div>{blog.author.name}</div>
                <div className="text-xl text-gray-600 relative -top-1">
                  <span>.</span>
                </div>
                <div>{blog.createdAt}</div>
              </div>
              <div>
                <div
                  className="sm:text-2xl text-pretty text-lg"
                  style={{
                    color: "rgba(36,36,93,255)",
                  }}
                >
                  {blog.content.length > 100
                    ? blog.content.slice(0, 100) + "..."
                    : blog.content}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
