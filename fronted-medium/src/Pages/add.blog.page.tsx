import { FormEvent } from "react";
import { ButtonComponent } from "../Components/Button";
import { NavBar } from "../Components/NavBar";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../config";
import { Loading } from "../Components/Loading";
import { useNavigate } from "react-router-dom";

export const PostBlog = () => {
  const navigate = useNavigate();
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    console.log(formData.get("title"));
    console.log(formData.get("content"));

    try {
      const res = await axios.post(
        `${BACKEND_URL}/blog`,
        {
          title: formData.get("title"),
          content: formData.get("content"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const response = res.data;

      if (!response.success) {
        return <Loading msg="Something went wrong while posting your blog" />;
      }
      const blog = response.data;
        navigate(`/blog/${blog.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        return alert(`${error.response?.data.message}`);
      } else {
        console.log(error);
        return alert(`Error while fetching blogs data`);
      }
    }
  };

  return (
    <div>
      <NavBar input={false} />
      <form
        action=""
        method="POST"
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center"
      >
        <div>
          <textarea
            name="title"
            id="title"
            placeholder="enter your title"
            className="outline outline-slate-200 px-2 sm:p-4 rounded-md bg-zinc-100"
            rows={5}
            cols={100}
            typeof="text"
          ></textarea>
        </div>
        <div>
          <textarea
            name="content"
            id="content"
            placeholder="enter your content"
            className="outline outline-slate-200 px-2 sm:p-4 rounded-md bg-zinc-100"
            rows={18}
            cols={200}
            typeof="text"
          ></textarea>
        </div>
        <ButtonComponent text="Publish Blog" type="submit" />
      </form>
    </div>
  );
};
