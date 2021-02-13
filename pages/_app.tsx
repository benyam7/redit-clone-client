import { AppProps } from "next/app";
import Axios from "axios";

import { useRouter } from "next/router";

import "../styles/tailwind.css";
import "../styles/icons.css";
import "../componets/Navbar";
import Navbar from "../componets/Navbar";

import { AuthProvider } from "../context/auth";

Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true;
export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const authRoutes = ["/register", "/login"];

  const authRoute = authRoutes.includes(pathname);

  return (
    <AuthProvider>
      {!authRoute && <Navbar />}
      <Component {...pageProps} />;
    </AuthProvider>
  );
}
