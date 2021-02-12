import { AppProps } from "next/app";
import Axios from "axios";
import { useRouter } from "next/router";

import "../styles/tailwind.css";
import "../componets/Navbar";
import { Fragment } from "react";
import Navbar from "../componets/Navbar";

Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true;
export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const authRoutes = ["/register", "/login"];

  const authRoute = authRoutes.includes(pathname);

  return (
    <Fragment>
      {!authRoute && <Navbar />}
      <Component {...pageProps} />;
    </Fragment>
  );
}
