import axios from "axios";

const list = async () => {
  try {
    let response = await axios.get(`/api/projects-assignment/`);
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

const create = async (data) => {
  await axios
    .post(`/api/projects-assignment/`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.message;
    });
};

const findOne = async (data) => {
  const pras_id = parseInt(data);
  try {
    let response = await axios.get(`/api/projects-assignment/${pras_id}`);
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

const update = async (data) => {
  const pras_id = parseInt(data.pras_id);
  try {
    let response = await axios.put(`/api/projects-assignment/${pras_id}`, data);
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

const remove = async (data) => {
  const pras_id = parseInt(data);
  try {
    let response = await axios.delete(`/api/projects-assignment/${pras_id}`);
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

export default {
  list,
  create,
  findOne,
  remove,
  update,
};
