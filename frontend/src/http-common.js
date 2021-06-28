import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3081/api",
  headers: {
    "Content-type": "application/json"
  }
});
