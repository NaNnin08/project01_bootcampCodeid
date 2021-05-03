import axios from "axios";

const list = async () => {
  try {
    let response = await axios.get(`/api/employees/`);
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

const create = async (data) => {
  await axios
    .post(`/api/employees/image`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.message;
    });
};

const findOne = async (data) => {
  const empe_id = parseInt(data);
  try {
    let response = await axios.get(`/api/employees/${empe_id}`);
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

const update = async (data) => {
  const empe_id = parseInt(data.empe_id);
  try {
    let response = await axios.put(`/api/employees/${empe_id}`, data);
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

const remove = async (data) => {
  const empe_id = parseInt(data);
  try {
    let response = await axios.delete(`/api/employees/${empe_id}`);
    return await response.data;
  } catch (err) {
    return await err.message;
  }
};

export default {
  list,
  create,
  findOne,
  update,
  remove,
};
