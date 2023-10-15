// GlobalApi.js
import axios from "axios";

const key = "64c36acb17ac4b2c804c6a257dce6873";

const axiosCreate = axios.create({
  baseURL: "https://api.rawg.io/api", // It should be 'baseURL', not 'baseUrl'
});

const getGenreList = () => {
  return axiosCreate.get("/genres?key=" + key);
};

export default {
  getGenreList,
};
