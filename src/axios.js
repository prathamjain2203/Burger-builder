import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-756bd-default-rtdb.firebaseio.com/",
});

export default instance;
