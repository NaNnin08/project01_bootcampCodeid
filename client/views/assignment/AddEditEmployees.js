import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DocumentAddIcon } from "@heroicons/react/solid";
import ApiAssignment from "./ApiAssignment";
import ApiEmployees from "../employees/ApiEmployees";
import ApiProjects from "../projects/ApiProjects";

export default function AddEditAssignment(props) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef();

  const [values, setValues] = useState({
    pras_id: undefined,
    pras_staus: undefined,
    pras_proj_id: undefined,
    pras_empe_id: undefined,
  });

  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  // gunakan useEffect untuk edit region
  useEffect(() => {
    ApiEmployees.list().then((data) => {
      setEmployees(data);
    });

    ApiProjects.list().then((data) => {
      setProjects(data);
    });

    if (props.assignment.actionType === "Edit") {
      //call apiRegion.findOne untuk mencari region dengan region_id yg dikirim dari props
      ApiAssignment.findOne(props.assignment.pras_id).then((data) => {
        // jika ketemu, ubah values nya, pastikan tambahkan value={values.region_name}
        // di input type region_name agar bisa show value nya
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            pras_id: data.pras_id,
            pras_staus: data.pras_staus,
            pras_proj_id: data.pras_proj_id,
            pras_empe_id: data.pras_empe_id,
          });
        }
      });
    } else {
      setValues({
        ...values,
        pras_id: undefined,
        pras_staus: undefined,
        pras_proj_id: undefined,
        pras_empe_id: undefined,
      });
    }
  }, [props.assignment.actionType]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = () => {
    const data = {
      pras_id: values.pras_id || undefined,
      pras_staus: values.pras_staus || undefined,
      pras_proj_id: values.pras_proj_id || undefined,
      pras_empe_id: values.pras_empe_id || undefined,
    };
    if (props.assignment.actionType === "Add") {
      //call api u/ insert row
      ApiAssignment.create(data).then((result) => {
        console.log(result);
      });
    } else if (props.assignment.actionType === "Edit") {
      ApiAssignment.update(data).then((data) => {
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
                          <label htmlFor="pras_staus" className="col-span-1">
                            Status
                          </label>
                          <select
                            className="col-span-3"
                            id="pras_staus"
                            name="pras_staus"
                            value={values.pras_staus}
                            onChange={handleChange("pras_staus")}
                          >
                            <option value="" disabled selected hidden>
                              Select User Type
                            </option>
                            <option value="start">Start</option>
                            <option value="inprogrees">Inprogrees</option>
                            <option value="finished">Finished</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="pras_proj_id" className="col-span-1">
                            Project
                          </label>
                          <select
                            className="col-span-3"
                            id="pras_proj_id"
                            name="pras_proj_id"
                            value={values.pras_proj_id}
                            onChange={handleChange("pras_proj_id")}
                          >
                            <option value="" disabled selected hidden>
                              Select User Type
                            </option>
                            {projects &&
                              projects.map((data) => {
                                return (
                                  <option
                                    value={data.proj_id}
                                    key={data.proj_id}
                                  >
                                    {data.proj_name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="pras_empe_id" className="col-span-1">
                            Employee
                          </label>
                          <select
                            className="col-span-3"
                            id="pras_empe_id"
                            name="pras_empe_id"
                            value={values.pras_empe_id}
                            onChange={handleChange("pras_empe_id")}
                          >
                            <option value="" disabled selected hidden>
                              Select User Type
                            </option>
                            {employees &&
                              employees.map((data) => {
                                return (
                                  <option
                                    value={data.empe_id}
                                    key={data.empe_id}
                                  >
                                    {data.empe_full_name}
                                  </option>
                                );
                              })}
                          </select>
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
