// create new data
const create = async (req, res) => {
    const empeloyees = await req.context.models.Employees.create({
        empe_full_name: req.body.empe_full_name,
        empe_email: req.body.empe_email,
        empe_birtdate: req.body.empe_birtdate,
        empe_phone_number: req.body.empe_phone_number,
        empe_hiredate: req.body.empe_hiredate,
        empe_salary: req.body.empe_salary,
        empe_position: req.body.empe_position,
        empe_department_name: req.body.empe_department_name,
    });
    return res.send(empeloyees)
}

//findAll = select * from regions
const findAll = async (req, res) => {
    const employees = await req.context.models.Employees.findAll();
    return res.send(employees);
}

//find by id
const findOne = async (req, res) => {
    const employees = await req.context.models.Employees.findOne({
        where: { empe_id: req.params.id },
    });
    return res.send(employees);
}

// create update
const update = async (req, res) => {
    const { 
        empe_full_name,
        empe_email,
        empe_birtdate,
        empe_phone_number,
        empe_hiredate,
        empe_salary,
        empe_position,
        empe_department_name,
     } = req.body;

    const employees = await req.context.models.Employees.update(
        { 
            empe_full_name: empe_full_name,
            empe_email: empe_email,
            empe_birtdate: empe_birtdate,
            empe_phone_number: empe_phone_number,
            empe_hiredate: empe_hiredate,
            empe_salary: empe_salary,
            empe_position: empe_position,
            empe_department_name: empe_department_name,
        }, //nama atribute yang akan diupdate
        { returning: true, where: { empe_id: req.params.id }}
    );
    return res.send(employees)
}

const image = async (req, res) => {
    console.log(req.fileName);
    const result = await req.context.models.Employees.update(
        { empe_image: req.fileName },
        { returning: true, where: { empe_id: parseInt(req.params.id) } }
    );
    return res.send(result);
}

const multiImage = async (req, res) => {
    const result = req.dataFiles;
    return res.send(result);
}

//delete
const remove = async (req, res) => {
    const employees = await req.context.models.Employees.destroy({
        where: { empe_id: req.params.id },
    });
    return res.send(true)
}

//multipart
const createII = async (req, res, next) => {
    // jika gunakan spread operator
    const { 
        name, 
        email, 
        birtdate, 
        number, 
        hiredate, 
        salary, 
        position, 
        department, 
        fileName} = req.dataEmployee;
    
        await req.context.models.Employees.create({
            empe_full_name: name,
            empe_email: email,
            empe_birtdate: birtdate,
            empe_phone_number: number,
            empe_hiredate: hiredate,
            empe_salary: parseInt(salary),
            empe_position: position,
            empe_department_name: department,
            empe_image: fileName,
        }).catch(error=>{
            console.log(error);
        });

    // using middleware
    next();
}


export default {
    create,
    findAll,
    findOne,
    update,
    remove,
    image,
    multiImage,
    createII,
}