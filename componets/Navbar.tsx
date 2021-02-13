import Link from "next/link";

import RedditLogo from "../public/images/reddit.svg";

export interface Props {}

const Navbar: React.FC = () => {
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
            className="pl-2.5 py-1 pr-3 rounded  bg-transparent w-96 focus:outline-none"
          />
        </i>
      </div>
      {/* auth */}

      <div className="flex">
        <Link href="/login">
          <a className="w-32 py-1 mr-5 leading-5 hollow blue button">Log in</a>
        </Link>

        <Link href="/login">
          <a className="w-32 py-1 leading-5 blue button">Sign up</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
