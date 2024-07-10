import { Link, useNavigate } from "react-router-dom";
interface DropdownProps {
  email: string;
}
const Dropdown = ({ email }: DropdownProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <div className="bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
      <div className="px-4 py-3">
        <p className="text-sm leading-5">Signed in as</p>
        <p className="text-sm font-medium leading-5 text-gray-900 truncate">
          {email}
        </p>
      </div>
      <div className="py-1">
        <Link
          to="/myblogs"
          className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
          role="menuitem"
        >
          My Blogs
        </Link>
      </div>
      <div className="py-1">
        <button
          onClick={handleLogout}
          className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
          role="menuitem"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
