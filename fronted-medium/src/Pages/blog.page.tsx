import { BlogRenderer } from "../Components/BlogRenderer";
import { Loading } from "../Components/Loading";
import { NavBar } from "../Components/NavBar";
import { useBlogs } from "../hooks/blog.fetch";

export const BlogPage = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <Loading msg="Your content is Loading" />;
  }

  return (
    <div>
      <NavBar type="signup" />
      <div className="p-4">
        <div className="text-blue-600 md:text-3xl sm:text-2xl text-xl text-center sm:font-extrabold font-bold">
          Blogs
        </div>
        <div className="flex flex-col items-center">
          <div className="sm:w-1/2">
            {blogs &&
              blogs.map((blog) => (
                <BlogRenderer
                  id={blog.id}
                  key={blog.id}
                  title={blog.title}
                  content={blog.content}
                  author={blog.author.name}
                  createdAt={blog.createdAt}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
