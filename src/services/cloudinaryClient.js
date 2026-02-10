import axios from "axios";

export const cloudinaryClient = axios.create({
  timeout: 10000,
});
