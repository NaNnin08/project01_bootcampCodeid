import formidable from "formidable";
import fs from "fs";

//1.declare pathDir untuk menyimpan image di local storage
const pathDir = __dirname + "../../uploads/";

const upload = async (req, res, next) => {
  // jika directory belum ada then create new one
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  const form = formidable({ multiples: true, uploadDir: pathDir });
  form.parse(req);
  form
    .on("fileBegin", (keyName, file) => {
      console.log(keyName, file);
      file.path = pathDir + file.name;
    })
    .on("field", (keyName, value) => {
      console.log(keyName, value);
    })
    .on("file", (keyName, file) => {
      console.log(keyName, file.name);
      req.fileName = file.name;
    })
    .on("end", () => {
      console.log("-> upload to storage done");
      next();
      //res.send("File Uploaded Successfully");
    });
};

const uploadMultipart = async (req, res, next) => {
  // jika directory belum ada then create new one
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  //1. gunakan spread operator
  let multipart = {};
  let name = undefined;
  let email = undefined;
  let birtdate = undefined;
  let number = undefined;
  let hiredate = undefined;
  let salary = undefined;
  let position = undefined;
  let department = undefined;

  const form = formidable({ multiples: true, uploadDir: pathDir });
  form.parse(req);

  form
    .on("fileBegin", (keyName, file) => {
      file.path = pathDir + file.name;
    })
    .on("field", (keyName, value) => {
      //2.gunakan spread operator untuk tambah attribute
      name = keyName === "empe_full_name" ? value : name;
      email = keyName === "empe_email" ? value : email;
      birtdate = keyName === "empe_birtdate" ? value : birtdate;
      number = keyName === "empe_phone_number" ? value : number;
      hiredate = keyName === "empe_hiredate" ? value : hiredate;
      salary = keyName === "empe_salary" ? value : salary;
      position = keyName === "empe_position" ? value : position;
      department = keyName === "empe_department_name" ? value : department;
      multipart = {
        ...multipart,
        name,
        email,
        birtdate,
        number,
        hiredate,
        salary,
        position,
        department,
      };
    })
    .on("file", (keyName, file) => {
      console.log(file);
      const fileName = file.name;
      //3. gunakan spread operator
      multipart = { ...multipart, fileName };
    })
    .on("end", () => {
      console.log("-> upload to storage done");
      //4.gunakan spread operator
      req.dataEmployee = multipart;

      next();
    });
};

const download = async (req, res) => {
  const filename = `${pathDir}/${req.params.filename}`;
  res.download(filename);
};

export default {
  upload,
  download,
  uploadMultipart,
};
