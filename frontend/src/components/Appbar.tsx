import { Avatar } from "./BlogCard";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import Dropdown from "./Dropdown";
import axios from "axios";

export const Appbar = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${BACKEND_URL}/api/v1/blog/user`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setEmail(response.data.user.email);
        setUsername(response.data.user.name);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [username]);

  return (
    <div className="border-b flex justify-between px-10 py-4 subpixel-antialiased">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer font-serif text-2xl font-bold"
        style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
      >
        Inkstream_
      </Link>
      <div className="flex items-center relative">
        {location.pathname !== "/publish" && (
          <Link to={`/publish`}>
            <button
              type="button"
              className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <FontAwesomeIcon icon={faPen} className="mr-2" />
              write...
            </button>
          </Link>
        )}
        <div className="relative group">
          <Avatar size={"big"} name={username} />
          <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Dropdown email={email} />
          </div>
        </div>
      </div>
    </div>
  );
};
