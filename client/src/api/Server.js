import axios from "./Axios";

const Server = {
  getAllConsultants: async () => {
    return await axios.get("/api/v1/consultant");
  },

  getSingleConsultant: async (id) => {
    return await axios.get("/api/v1/consultant/" + id);
  },
};

export default Server;
