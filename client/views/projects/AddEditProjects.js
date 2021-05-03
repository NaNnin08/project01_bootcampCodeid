import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DocumentAddIcon } from "@heroicons/react/solid";
import ApiProjects from "./ApiProjects";

export default function AddEditProjects(props) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef();

  const [values, setValues] = useState({
    proj_name: "",
    proj_create: "",
    proj_start_date: "",
    proj_end_date: "",
    proj_category: "",
    proj_description: "",
  });

  // gunakan useEffect untuk edit region
  useEffect(() => {
    if (props.project.actionType === "Edit") {
      //call apiRegion.findOne untuk mencari region dengan region_id yg dikirim dari props
      ApiProjects.findOne(props.project.proj_id).then((data) => {
        // jika ketemu, ubah values nya, pastikan tambahkan value={values.region_name}
        // di input type region_name agar bisa show value nya
        setValues({
          ...values,
          proj_id: data.proj_id,
          proj_name: data.proj_name,
          proj_create: data.proj_create,
          proj_start_date: data.proj_start_date,
          proj_end_date: data.proj_end_date,
          proj_category: data.proj_category,
          proj_description: data.proj_description,
        });
      });
    } else {
      setValues({
        ...values,
        proj_name: "",
        proj_create: "",
        proj_start_date: "",
        proj_end_date: "",
        proj_category: "",
        proj_description: "",
      });
    }
  }, [props.project.actionType]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = () => {
    if (props.project.actionType === "Add") {
      const data = {
        proj_name: values.proj_name || undefined,
        proj_create: values.proj_create || undefined,
        proj_start_date: values.proj_start_date || undefined,
        proj_end_date: values.proj_end_date || undefined,
        proj_category: values.proj_category || undefined,
        proj_description: values.proj_description || undefined,
      };
      //call api u/ insert row
      ApiProjects.create(data).then((result) => {
        console.log(result);
      });
    } else if (props.project.actionType === "Edit") {
      ApiProjects.update(values).then((data) => {
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
                          <label htmlFor="proj_name" className="col-span-1">
                            Name:
                          </label>
                          <input
                            className="col-span-3"
                            id="proj_name"
                            name="proj_name"
                            type="text"
                            value={values.proj_name}
                            onChange={handleChange("proj_name")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="proj_create" className="col-span-1">
                            Create At:
                          </label>
                          <input
                            className="col-span-3"
                            id="proj_create"
                            name="proj_create"
                            type="date"
                            value={values.proj_create}
                            onChange={handleChange("proj_create")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label
                            htmlFor="proj_start_date"
                            className="col-span-1"
                          >
                            Start At:
                          </label>
                          <input
                            className="col-span-3"
                            id="proj_start_date"
                            name="proj_start_date"
                            type="date"
                            value={values.proj_start_date}
                            onChange={handleChange("proj_start_date")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="proj_end_date" className="col-span-1">
                            End At:
                          </label>
                          <input
                            className="col-span-3"
                            id="proj_end_date"
                            name="proj_end_date"
                            type="date"
                            value={values.proj_end_date}
                            onChange={handleChange("proj_end_date")}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label htmlFor="proj_category" className="col-span-1">
                            Category:
                          </label>
                          <select
                            className="col-span-3"
                            id="proj_category"
                            name="proj_category"
                            value={values.proj_category}
                            onChange={handleChange("proj_category")}
                          >
                            <option value="" disabled selected hidden>
                              Select User Type
                            </option>
                            <option value="software">Software</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="outsource">Outsource</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                          <label
                            htmlFor="proj_description"
                            className="col-span-1"
                          >
                            Description:
                          </label>
                          <textarea
                            className="col-span-3"
                            id="proj_description"
                            name="proj_description"
                            type="text"
                            value={values.proj_description}
                            onChange={handleChange("proj_description")}
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
