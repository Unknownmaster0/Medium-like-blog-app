import { Link } from "react-router-dom";

export const BottomPageLinkComponent = ({
  to,
  text,
  linktext,
}: {
  to: string;
  text: string;
  linktext: string;
}) => {
  return (
    <div className="space-x-4">
      <span className="text-zinc-600 md:text-lg">{text}</span>
      <Link
        to={to}
        className="cursor-pointer bg-black text-zinc-200 md:py-2 md:px-5 rounded-md md:text-lg px-3 py-1 font-bold"
      >
        {linktext}
      </Link>
    </div>
  );
};
