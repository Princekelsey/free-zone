import axios from "./Axios";

const Server = {
  getAllConsultants: async () => {
    return await axios.get("/api/v1/consultant");
  },
};

export default Server;
