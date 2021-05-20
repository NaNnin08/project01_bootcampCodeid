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

const createMulti = async (data) => {
  await axios
    .post(`/api/employees/multipart`, data)
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

const updateMulti = async (data) => {
  const id = parseInt(data.get("empe_id"));
  try {
    let response = await axios.put(
      `/api/employees/updateMultipart/${id}`,
      data
    );
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

const showImage = async (blobUrl, fileName) => {
  try {
    let response = await axios.get(blobUrl, { responseType: "blob" });
    return await new File([response.data], fileName);
  } catch (error) {
    return await error.message;
  }
};

export default {
  list,
  create,
  createMulti,
  findOne,
  update,
  updateMulti,
  remove,
  showImage,
};
