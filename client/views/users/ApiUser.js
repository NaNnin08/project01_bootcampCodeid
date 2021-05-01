import axios from "axios";

const create = async (user) => {
  await axios
    .post("/api/users/signup", user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.message;
    });
};

const login = async (user) => {
  await axios
    .post("/api/users/signin", user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.message;
    });
};

export default {
  create,
  login,
};
