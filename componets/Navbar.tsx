import Link from "next/link";

import RedditLogo from "../public/images/reddit.svg";
import { useAuthState, useAuthDispatch } from "../context/auth";
import React, { Fragment, useState } from "react";
import Axios from "axios";
import { Sub } from "../types";

export interface Props {}

const Navbar: React.FC = () => {
  const [subName, setsubName] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);

  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();
  const logout = () => {
    Axios.get("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");

        window.location.reload();
      })
      .catch((err) => console.log(err)).finally;
  };

  const searchSubs = async (subName: string) => {
    setsubName(subName);

    try {
      const { data } = await Axios.get(`/subs/search/${subName}`);
      setSubs(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
      {/* logo n title */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <RedditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="text-2xl font-semibold">
          <Link href="/">reddit</Link>
        </span>
      </div>
      {/* search */}

      <div className="flex mx-auto bg-gray-100 border rounded item-center hover:border-blue-500 hover:bg-white">
        <i className="pl-3 pr-3 text-gray-500 fas fa-search">
          <input
            placeholder="SEARCH"
            type="text"
            value={subName}
            onChange={(e) => searchSubs(e.target.value)}
            className="pl-2.5 py-1 pr-3 rounded  bg-transparent w-96 focus:outline-none"
          />
        </i>
      </div>
      {/* auth */}

      <div className="flex">
        {!loading &&
          (authenticated ? (
            // logout
            <button
              onClick={() => logout()}
              className="w-32 py-1 mr-5 leading-5 hollow blue button"
            >
              Logout
            </button>
          ) : (
            <Fragment>
              <Link href="/login">
                <a className="w-32 py-1 mr-5 leading-5 hollow blue button">
                  Log in
                </a>
              </Link>

              <Link href="/login">
                <a className="w-32 py-1 leading-5 blue button">Sign up</a>
              </Link>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
