import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import AddEditProjects from "./AddEditProjects";
import ApiProjects from "./ApiProjects";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

export function Projects() {
  const [projects, setProjects] = useState([]);

  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);

  const [project, setProject] = useState({
    proj_id: undefined,
    actionType: undefined,
  });

  // useEffect(() => {
  //   ApiProjects.list()
  //     .then((data) => {
  //       setProjects(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    ApiProjects.list()
      .then((data) => {
        setProjects(data);
        setStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);

  const onCreate = async () => {
    setProject({
      proj_id: undefined,
      actionType: "Add",
    });
    setModal(true);
  };

  const onEdit = async (id) => {
    setProject({
      proj_id: id,
      actionType: "Edit",
    });
    setModal(true);
  };

  const onDelete = async (id) => {
    ApiProjects.remove(id).then((result) => {
      console.log(result);
    });
    setStatus(!status);
  };

  return (
    <>
      <Header title="Daftar Project" setModal={() => onCreate()} />

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {/* <!-- 1 card --> */}
          {projects.map((data) => (
            <div
              className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl"
              key={data.proj_id}
            >
              {data.proj_category === "software" ? (
                <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-green-500 left-4 -top-6">
                  {/*  <!-- svg  --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              ) : data.proj_category === "maintenance" ? (
                <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-blue-500 left-4 -top-6">
                  {/* <!-- svg  --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              ) : (
                <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-yellow-500 left-4 -top-6">
                  {/* <!-- svg  --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>
              )}

              <div className="flex mt-0 opacity-50">
                <span className="mr-6 absolute right-0">
                  <button
                    onClick={() => {
                      onEdit(data.proj_id);
                    }}
                    type="button"
                    className="w-4 mr-2 transform hover:scale-110"
                  >
                    <PencilAltIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-500 hover:text-green-500"
                      aria-hidden="true"
                    />
                  </button>
                </span>
                <span className="absolute right-0">
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        onDelete(data.proj_id);
                    }}
                    type="button"
                    className="w-4 mr-2 transform hover:scale-110"
                  >
                    <TrashIcon
                      className="-ml-1 mr-2 h-5 w-5 hover:text-red-500 text-gray-500"
                      aria-hidden="true"
                    />
                  </button>
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xl font-semibold my-2 capitalize">
                  {data.proj_category}
                </p>
                <div className="flex space-x-2 text-gray-400 text-sm">
                  {/* <!-- svg  --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p>{data.proj_name}</p>
                </div>
                <div className="flex space-x-2 text-gray-400 text-sm my-3">
                  {/*  <!-- svg  --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>created: {data.proj_create}</p>
                </div>
                <div className="flex space-x-2 text-gray-400 text-sm my-3">
                  {/*  <!-- svg  --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>start: {data.proj_start_date}</p>
                </div>
                <div className="flex space-x-2 text-gray-400 text-sm my-3">
                  {/*  <!-- svg  --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>end: {data.proj_end_date}</p>
                </div>

                <div className="border-t-2"></div>

                <div className="flex justify-between">
                  <div className="my-2">
                    <p className="font-semibold text-base mb-2">Description</p>
                    <div className="flex space-x-2">
                      <p>{data.proj_description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal ? (
        <AddEditProjects
          title={project.actionType === "Add" ? "Add Project" : "Edit Project"}
          setModal={() => setModal(false)}
          setStatus={() => setStatus(true)}
          project={project}
        />
      ) : null}
    </>
  );
}
