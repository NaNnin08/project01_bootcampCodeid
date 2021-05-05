import axios from "axios";

const create = async (user) => {
  await axios
    .post("/api/users/signup", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
};

const login = async (user) => {
  // await axios
  //   .post("/api/users/signin", user)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return error.message;
  //   });
  try {
    let response = await axios.post("/api/users/signin", user);
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

const logout = async () => {
  try {
    let response = await axios.post("/api/users/signout");
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

export default {
  create,
  login,
  logout,
};
