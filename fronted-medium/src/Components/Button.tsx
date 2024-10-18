import { MouseEventHandler } from "react";

export const ButtonComponent = ({
  text,
  onclick,
}: {
  text: string;
  onclick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="bg-black text-zinc-200 md:py-2 md:px-5 rounded-md md:text-lg px-3 py-1 font-bold"
      onClick={onclick}
    >
      {text}
    </button>
  );
};
