import "../styles/globals.css";
import { AppProps } from "next/app";
import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:5000/api";
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
