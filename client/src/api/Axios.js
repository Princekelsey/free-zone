import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("refreshToken");

const Axios = axios.create({
  baseURL: "http://localhost:5000",
});

export default Axios;
