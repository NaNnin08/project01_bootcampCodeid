// create new data
const create = async (req, res) => {
  const pa = await req.context.models.Pa.create({
    pras_staus: req.body.pras_staus,
    pras_proj_id: req.body.pras_proj_id,
    pras_empe_id: req.body.pras_empe_id,
  });
  return res.send(pa);
};

const createMultipart = async (req, res) => {
  const dataEmployee = req.body;

  for (const data of dataEmployee) {
    await createEmp(req, res, data);
  }
};

const createEmp = async (req, res, data) => {
  await req.context.models.Pa.create(data).catch((err) => console.log(err));
};

//findAll = select * from regions
const findAll = async (req, res) => {
  const pa = await req.context.models.Pa.findAll({
    include: [
      {
        all: true,
      },
    ],
  });
  return res.send(pa);
};

//find by id
const findOne = async (req, res) => {
  const pa = await req.context.models.Pa.findOne({
    where: { pras_id: req.params.id },
  });
  return res.send(pa);
};

// create update
const update = async (req, res) => {
  const pa = await req.context.models.Pa.update(
    {
      pras_staus: req.body.pras_staus,
      pras_proj_id: req.body.pras_proj_id,
      pras_empe_id: req.body.pras_empe_id,
    }, //nama atribute yang akan diupdate
    { returning: true, where: { pras_id: req.params.id } }
  );
  return res.send(pa);
};

//delete
const remove = async (req, res) => {
  const pa = await req.context.models.Pa.destroy({
    where: { pras_id: req.params.id },
  });
  return res.send(true);
};

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
  createMultipart,
};
