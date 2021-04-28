// create new data
const create = async (req, res) => {
    const projects = await req.context.models.Projects.create({
        proj_name: req.body.proj_name,
        proj_create: req.body.proj_create,
        proj_start_date: req.body.proj_start_date,
        proj_end_date: req.body.proj_end_date,
        proj_category: req.body.proj_category,
        proj_description: req.body.proj_description,
    });
    return res.send(projects)
}

//findAll = select * from regions
const findAll = async (req, res) => {
    const projects = await req.context.models.Projects.findAll();
    return res.send(projects);
}

//find by id
const findOne = async (req, res) => {
    const projects = await req.context.models.Projects.findOne({
        where: { proj_id: req.params.id },
    });
    return res.send(projects);
}

// create update
const update = async (req, res) => {
    const projects = await req.context.models.Projects.update(
        {
        proj_name: req.body.proj_name,
        proj_create: req.body.proj_create,
        proj_start_date: req.body.proj_start_date,
        proj_end_date: req.body.proj_end_date,
        proj_category: req.body.proj_category,
        proj_description: req.body.proj_description,
    },
    { returning: true, where: { proj_id: req.params.id }},
    );
    return res.send(projects);
}

//delete
const remove = async (req, res) => {
    const projects = await req.context.models.Projects.destroy({
        where: { proj_id: req.params.id },
    });
    return res.send(true)
}


export default {
    create,
    findAll,
    findOne,
    update,
    remove,
}