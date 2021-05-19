import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DocumentAddIcon } from "@heroicons/react/solid";
import ApiEmployees from "./ApiEmployees";

export default function AddEditEmployees(props) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef();

  const [values, setValues] = useState({
    empe_full_name: undefined,
    empe_email: undefined,
    empe_birtdate: undefined,
    empe_phone_number: undefined,
    empe_hiredate: undefined,
    empe_salary: undefined,
    empe_position: undefined,
    empe_department_name: undefined,
    empe_image: undefined,
    error: "",
  });

  const [blob, setBlob] = useState([]);
  const [files, setFiles] = useState([]);

  const uploadSingleFile = (name) => (event) => {
    setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0]) });

    setFiles({ ...files, [name]: event.target.files[0] });
  };

  // gunakan useEffect untuk edit region
  useEffect(() => {
    if (props.employee.actionType === "Edit") {
      //call apiRegion.findOne untuk mencari region dengan region_id yg dikirim dari props
      ApiEmployees.findOne(props.employee.empe_id).then((data) => {
        // jika ketemu, ubah values nya, pastikan tambahkan value={values.region_name}
        // di input type region_name agar bisa show value nya
        setValues({
          ...values,
          empe_id: data.empe_id,
          empe_full_name: data.empe_full_name,
          empe_email: data.empe_email,
          empe_birtdate: data.empe_birtdate,
          empe_phone_number: data.empe_phone_number,
          empe_hiredate: data.empe_hiredate,
          empe_salary: data.empe_salary,
          empe_position: data.empe_position,
          empe_department_name: data.empe_department_name,
        });
      });
    } else {
      setValues({
        ...values,
        empe_full_name: undefined,
        empe_email: undefined,
        empe_birtdate: undefined,
        empe_phone_number: undefined,
        empe_hiredate: undefined,
        empe_salary: undefined,
        empe_position: undefined,
        empe_department_name: undefined,
        empe_image: undefined,
      });
    }
  }, [props.employee.actionType]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (props.employee.actionType === "Add") {
      let employee = new FormData();

      employee.append("empe_full_name", values.empe_full_name);
      employee.append("empe_email", values.empe_email);
      employee.append("empe_birtdate", values.empe_birtdate);
      employee.append("empe_phone_number", values.empe_phone_number);
      employee.append("empe_hiredate", values.empe_hiredate);
      employee.append("empe_salary", parseInt(values.empe_salary));
      employee.append("empe_position", values.empe_position);
      employee.append("empe_department_name", values.empe_department_name);
      files.empe_image && employee.append("empe_image", files.empe_image);

      for (var value of employee.entries()) {
        console.log(value);
      }

      ApiEmployees.createMulti(employee).then((data) => {
        if (data.errors) {
          console.log("create new record failed");
          setValues({ ...values, error: data.errors[0].message });
        } else {
          console.log("succeed");
        }
      });
    } else if (props.employee.actionType === "Edit") {
      ApiEmployees.update(values).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "", open: true });
        }
      });
    }

    props.setModal();
    props.setStatus();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={props.setModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <DocumentAddIcon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {props.title}
                    </Dialog.Title>
                    <div className="mt-8">
                      {/** code here... */}
                      <form method="POST" action="#">
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label
                            htmlFor="empe_full_name"
                            className="col-span-1"
                          >
                            Full Name:
                          </label>
                          <input
                            className="col-span-3"
                            id="empe_full_name"
                            name="empe_full_name"
                            type="text"
                            value={values.empe_full_name}
                            onChange={handleChange("empe_full_name")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="empe_email" className="col-span-1">
                            Email
                          </label>
                          <input
                            className="col-span-3"
                            id="empe_email"
                            name="empe_email"
                            type="text"
                            value={values.empe_email}
                            onChange={handleChange("empe_email")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="empe_birtdate" className="col-span-1">
                            Birtday
                          </label>
                          <input
                            className="col-span-3"
                            id="empe_birtdate"
                            name="empe_birtdate"
                            type="date"
                            value={values.empe_birtdate}
                            onChange={handleChange("empe_birtdate")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label
                            htmlFor="empe_phone_number"
                            className="col-span-1"
                          >
                            Phone Number
                          </label>
                          <input
                            className="col-span-3"
                            id="empe_phone_number"
                            name="empe_phone_number"
                            type="text"
                            value={values.empe_phone_number}
                            onChange={handleChange("empe_phone_number")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="empe_hiredate" className="col-span-1">
                            Hiredate
                          </label>
                          <input
                            className="col-span-3"
                            id="empe_hiredate"
                            name="empe_hiredate"
                            type="date"
                            value={values.empe_hiredate}
                            onChange={handleChange("empe_hiredate")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="empe_salary" className="col-span-1">
                            salary
                          </label>
                          <input
                            className="col-span-3"
                            id="empe_salary"
                            name="empe_salary"
                            type="text"
                            value={values.empe_salary}
                            onChange={handleChange("empe_salary")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="empe_position" className="col-span-1">
                            Position
                          </label>
                          <select
                            className="col-span-3"
                            id="empe_position"
                            name="empe_position"
                            value={values.empe_position}
                            onChange={handleChange("empe_position")}
                          >
                            <option value="" disabled selected hidden>
                              Select User Type
                            </option>
                            <option value="programmer">Programer</option>
                            <option value="manager">Manager</option>
                            <option value="director">Director</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label
                            htmlFor="empe_department_name"
                            className="col-span-1"
                          >
                            Department Name
                          </label>
                          <select
                            className="col-span-3"
                            id="empe_department_name"
                            name="empe_department_name"
                            value={values.empe_department_name}
                            onChange={handleChange("empe_department_name")}
                          >
                            <option value="" disabled selected hidden>
                              Select User Type
                            </option>
                            <option value="it">IT</option>
                            <option value="human resource">
                              Human Resource
                            </option>
                            <option value="sales">Sales</option>
                          </select>
                        </div>
                        {blob.image && (
                          <div className="mx-auto h-48 w-24 text-gray-400">
                            <img
                              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                              alt=""
                              className="mx-auto h-48 w-48"
                            />
                          </div>
                        )}
                        <div className="ml-28 mb-2 h-48 w-24 text-gray-400">
                          <img
                            src={blob.empe_image}
                            alt=""
                            className="h-48 w-48"
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="empe_image" className="col-span-1">
                            Image
                          </label>
                          <input
                            className="col-span-3"
                            id="empe_image"
                            name="empe_image"
                            type="file"
                            onChange={uploadSingleFile("empe_image")}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.setModal()}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
