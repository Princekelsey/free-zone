import axios from "./Axios";
import Cookie from "js-cookie";

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

  getCurrentUser: async (token) => {
    return await axios.get("/api/v1/auth/user/me", {
      headers: { Authorization: `Bearer ${token ? token : ""}` },
    });
  },

  getUserRooms: async (token) => {
    let access = Cookie.get("refreshToken");
    if (token) {
      access = token;
    }
    return await axios.get("/api/v1/room/joined/user", {
      headers: { Authorization: `Bearer ${access ? access : ""}` },
    });
  },

  signUpUser: async (userData) => {
    return await axios.post("/api/v1/auth/register", userData);
  },

  createRoom: async (roomName, token) => {
    let access = Cookie.get("refreshToken");
    if (token) {
      access = token;
    }
    return await axios.post(
      "/api/v1/room",
      { roomName },
      {
        headers: { Authorization: `Bearer ${access ? access : ""}` },
      }
    );
  },

  joinChatRoom: async (values, token) => {
    let access = Cookie.get("refreshToken");
    if (token) {
      access = token;
    }
    return await axios.post("/api/v1/room/join", values, {
      headers: { Authorization: `Bearer ${access ? access : ""}` },
    });
  },
};

export default Server;
