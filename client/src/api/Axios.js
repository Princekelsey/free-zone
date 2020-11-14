import axios from "axios";

export const baseURL = `https://freezone-api.herokuapp.com`;

const Axios = axios.create({
  baseURL,
});

export default Axios;
