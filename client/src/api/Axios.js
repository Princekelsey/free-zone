import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = `http://localhost:5000`;

const token = Cookies.get("refreshToken");

const Axios = axios.create({
  baseURL,
});

export default Axios;
