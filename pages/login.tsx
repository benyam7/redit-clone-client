import Head from "next/head";
import Link from "next/link";
import router, { useRouter } from "next/router";
import Axios from "axios";
import { FormEvent, useState } from "react";

import InputGroup from "../componets/InputGroup";
import { useAuthDispatch, useAuthState } from "../context/auth";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();

  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await Axios.post("/auth/login", {
        password,
        username,
      });
      dispatch("LOGIN", res.data);
      router.push("/");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
      </Head>

      <div
        className="h-screen bg-right bg-cover w-36"
        style={{ backgroundImage: "url('/images/squares.jpg')" }}
      ></div>

      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Log in</h1>

          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>

          <form onSubmit={submitForm}>
            <small className="block font-medium text-red-600">
              {errors.error}
            </small>
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
              Log in
            </button>
          </form>

          <small>
            New to Reddit?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Sign up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
