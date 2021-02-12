import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { FormEvent, useState } from "react";
import classNames from "classnames";
import InputGroup from "../componets/InputGroup";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreement, setAgreement] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await Axios.post("/auth/register", {
        email,
        password,
        username,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
    }
  };

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

          <form onSubmit={submitForm}>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to get emails about cool stuff on Reddit
              </label>
            </div>
            <InputGroup
              type="email"
              placeholder="EMAIL"
              className="mb-2"
              value={email}
              setValue={setEmail}
              error={errors.email}
            />

            <InputGroup
              type="text"
              placeholder="USERNAME"
              className="mb-2"
              value={username}
              setValue={setUsername}
              error={errors.username}
            />

            <InputGroup
              type="password"
              placeholder="PASSWORD"
              className="mb-2"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />

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
