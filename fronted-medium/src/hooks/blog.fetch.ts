import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios, { AxiosError } from "axios";

export interface BlogProp {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
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

  return {
    loading,
    blogs,
  };
};

export const useBlogId = ({id} : {id: string}) => {
    const [blog, setBlog] = useState<BlogProp>();
    const [loading, setLoading] = useState<boolean>(true);   

    useEffect(() => {
        (async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/blog/${id}`);
            const data = response.data;
            if (!data.success) {
              return alert(`${data.message}`);
            }
            const Blog = data.data;
            setBlog(Blog);
            setLoading(false);
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
      }, [id]);

    return {
        loading,
        blog
    }
}