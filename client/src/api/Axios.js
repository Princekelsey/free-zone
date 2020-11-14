import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = `https://freezone-api.herokuapp.com`;

const token = Cookies.get("refreshToken");

const Axios = axios.create({
  baseURL,
});

export default Axios;
