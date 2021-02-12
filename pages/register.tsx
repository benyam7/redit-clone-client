import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="h-screen bg-right bg-cover w-36"
        style={{ backgroundImage: "url('/images/squares.jpg')" }}
      ></div>

      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign up</h1>

          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>

          <form>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to get emails about cool stuff on Reddit
              </label>
            </div>

            <div className="mb-2">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded outline-none focus:bg-white hover:bg-white bg-gray-50"
              />
            </div>

            <div className="mb-2">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 transition duration-200 border border-gray-300 rounded outline-none focus:bg-white hover:bg-white bg-gray-50"
              />
            </div>

            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 transition duration-200 border border-gray-300 rounded outline-none focus:bg-white hover:bg-white bg-gray-50"
              />
            </div>

            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase transition duration-200 bg-blue-500 border border-blue-500 rounded">
              Sign Up
            </button>
          </form>

          <small>
            Already a redditor?
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">Log In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
