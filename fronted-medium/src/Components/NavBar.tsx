import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

interface props {
  type?: string;
  name?: string;
  input?: boolean;
}

export const NavBar = ({ type, name, input=true }: props) => {
  return (
    <div className="flex items-center justify-between">
      {/* adding the logo */}
      <div
        style={{
          backgroundImage: `URL(${"https://img.freepik.com/premium-vector/creative-elegant-abstract-minimalistic-logo-design-vector-any-brand-company_1253044-16595.jpg?size=626&ext=jpg"})`,
          width: "5rem",
          height: "5rem",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* adding search bar */}
     {input && <div>
        <input
          type="text"
          placeholder="search"
          className="bg-zinc-200 md:w-80 h-8 pl-2 rounded-md focus:outline-1 focus:outline-slate-700"
        />
      </div>}

      {/* adding icons and some user */}
      <div className="flex space-x-8 sm:w-52">
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div>
          {name ? (
            <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center text-sm">
              <span>{`${name}`}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
