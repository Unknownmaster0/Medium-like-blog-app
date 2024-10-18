import { useEffect, useState } from "react";
import { BlogRenderer } from "../Components/BlogRenderer";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../config";

interface blogProps{
    title: string;
    content: string;
    author: string;
    publishedDate: string;
}

export const BlogPage = () => {
  const [blogs, setBlogs] = useState<blogProps[]>([
    {
      title: "",
      content: "",
      author: "",
      publishedDate: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/bulk`);
        const data = response.data;
        if (!data.success) {
          return alert(`${data.message}`);
        }
        const allBlogs = data.data;
        setBlogs(allBlogs);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          return alert(`${error.response?.data.message}`);
        } else {
          console.log(error);
          return alert(`Error while fetching blogs data`);
        }
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <div className="text-blue-600 md:text-3xl sm:text-2xl text-xl text-center sm:font-extrabold font-bold">Blogs</div>
      {/* <div>
        {blogs &&
          blogs.map((blog) => (
            <BlogRenderer title={blog.title} content={blog.content} author={blog.author} publishedDate={blog.publishedDate}/>
          ))}
      </div> */}
      <BlogRenderer title="this is title" content="loremaaaaaaaaaaaaaaaaaaaaaajkfjdifjaidfjkjfkajdfkkajdfidueijrkdjfkdmmffkkddfjjjjjjjjjjjjjjjjjjjsdddddddddjjjjjjjjjjjjjjjjjjjjjdffffffffffffffffffffffffffffffffffffffffjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj" author="sagar singh" publishedDate="23-09-12" />
    </div>
  );
};
