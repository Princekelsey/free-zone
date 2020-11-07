import axios from "./Axios";

const Server = {
  getAllConsultants: async () => {
    return await axios.get("/api/v1/consultant");
  },

  getSingleConsultant: async (id) => {
    return await axios.get("/api/v1/consultant/" + id);
  },

  getAllChatRooms: async () => {
    return await axios.get("/api/v1/room");
  },

  signInUser: async (userData) => {
    return await axios.post("/api/v1/auth/login", userData);
  },

  getCurrentUser: async () => {
    return await axios.get("/api/v1/auth/user/me");
  },
};

export default Server;
