import { stylesDesign } from "../assets/boxShadow";
import { ButtonComponent } from "../Components/Button";
import { HeaderComponent } from "../Components/Header";
import { InputboxComponent } from "../Components/Inputbox";
import { BottomPageLinkComponent } from "../Components/Bottom.page.link";
import { ChangeEvent, useState } from "react";
import { signin } from "@try-singh/medium-blog-common";
import axios, { AxiosError } from "axios";

export const Signin = () => {
  const [userInput, setUserInput] = useState<signin>({
    email: "",
    password: "",
  });
  const onclickHandler = async () => {
    if (!userInput.email || !userInput.password) {
      return alert("Please enter your email and password");
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8787/api/v1/signin",
        {
          email: userInput.email,
          password: userInput.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.data;
      console.log(result);
      if (!result.success) {
        return alert(`${result.message}`);
      }

      const token = result.data.token;
      localStorage.setItem("token", token);
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(`${error.response?.data?.message}`);
      } else {
        console.error("An unexpected error occurred", error);
        return alert(`something unexpected happened while signing-in`);
      }
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div
        className="md:space-y-4 space-y-2 md:p-4 p-2 flex flex-col items-center"
        style={stylesDesign.card}
      >
        <HeaderComponent text="Log in to Account" />
        <div className="md:space-y-4 space-y-2">
          <InputboxComponent
            type="email"
            placeholder="unknown@gmail.com"
            label="Email address"
            forInput="email"
            value={userInput.email}
            onChange={onChangeHandler}
          />
          <InputboxComponent
            type="text"
            placeholder="password"
            label="Password"
            forInput="password"
            value={userInput.password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="md:space-y-4 space-y-2 flex flex-col justify-center">
          <ButtonComponent text="Sign-in" onclick={onclickHandler} />
          <BottomPageLinkComponent
            to="/signup"
            text="Don't have an account yet?"
            linktext="Sign Up"
          />
        </div>
      </div>
    </div>
  );
};
