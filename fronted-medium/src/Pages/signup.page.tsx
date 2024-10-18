import { ButtonComponent } from "../Components/Button";
import { HeaderComponent } from "../Components/Header";
import { InputboxComponent } from "../Components/Inputbox";
import { BottomPageLinkComponent } from "../Components/Bottom.page.link";
import { stylesDesign } from "../assets/boxShadow";
import { Quote } from "../Components/Quote";
import { ChangeEvent, useState } from "react";
import { signup } from "@try-singh/medium-blog-common";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<signup>({
    email: "",
    password: "",
    name: "",
  });

  const onclickHandler = async () => {
    console.log(`came here`);

    if (!userInput.email || !userInput.password || !userInput.name) {
      console.log(`but not in if block of click handler`);
      //   return <ErrorComponent msg="All input fields are required" />;
      return alert(`Please enter all input fields`);
    }

    if (userInput.password.length < 8) {
      return alert(`password must be at least 8 characters`);
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/signup`,
        {
          email: userInput.email,
          password: userInput.password,
          name: userInput.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (!data.success) {
        return alert(`${data.message}`);
      }
      const token = data.data.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(`${error.response?.data?.message}`);
      } else {
        console.error("An unexpected error occurred", error);
        return alert(`something unexpected happened while signing-up`);
      }
    }
  };

  // setting the user content.
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((oldval) => ({
      ...oldval,
      [name]: value,
    }));
  };

  return (
    <div className="md:grid md:grid-cols-2 md:h-screen">
      <div className="flex justify-center items-center h-screen">
        <div
          className="md:space-y-4 space-y-2 md:p-4 p-2 flex flex-col items-center"
          style={stylesDesign.card}
        >
          <HeaderComponent text="Create your account" />
          <div className="md:space-y-4 space-y-2">
            <InputboxComponent
              type="text"
              placeholder="unknown master"
              label="Your name"
              forInput="name"
              value={userInput?.name}
              onChange={onChangeHandler}
            />
            <InputboxComponent
              type="email"
              placeholder="unknown@gmail.com"
              label="Email address"
              value={userInput?.email}
              forInput="email"
              onChange={onChangeHandler}
            />
            <InputboxComponent
              type="text"
              placeholder="password"
              label="Password"
              value={userInput?.password}
              forInput="password"
              onChange={onChangeHandler}
            />
          </div>
          <div className="md:space-y-4 space-y-2 flex flex-col justify-center">
            <ButtonComponent text="Sign Up" onclick={onclickHandler} />
            <BottomPageLinkComponent
              to="/signin"
              text="Already have an account?"
              linktext="Sign-in"
            />
          </div>
        </div>
      </div>
      <div className="hidden md:flex">
        <Quote />
      </div>
    </div>
  );
};
