import React, { useEffect, useState } from "react";
import ApiAssignment from "./ApiAssignment";
import Header from "../../components/layout/Header";
import AddEditAssignment from "./AddEditEmployees";
import ReactTooltip from "react-tooltip";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

export const assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [assignment, setAssignment] = useState({
    pras_id: undefined,
    actionType: undefined,
  });

  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    ApiAssignment.list()
      .then((data) => {
        setAssignments(data);
      })
      .catch((err) => {
        console.log(err);
      });

    setStatus(false);
  }, [status]);

  const onCreate = async (id) => {
    setAssignment({
      pras_id: id,
      actionType: "Add",
    });
    setModal(true);
  };

  const onEdit = async (id) => {
    setAssignment({
      pras_id: id,
      actionType: "Edit",
    });
    setModal(true);
  };

  const onDelete = async (id) => {
    ApiAssignment.remove(id).then(() => {
      setStatus(!status);
    });
  };

  return (
    <>
      <Header title="Daftar Assignment" setModal={() => onCreate()} />

      <div className="mt-14 min-h-screen">
        <table className="w-1/2 md:w-4/6  mx-auto">
          <thead className="">
            <tr className="bg-gray-800">
              <th className="hidden md:block px-16 py-2">
                <span className="text-gray-300"></span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-300">Name</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-300">Project</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-300">Status</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {assignments.map((data) => (
              <tr
                className="bg-white border-4 border-gray-200"
                key={data.pras_id}
              >
                <td className="px-16 py-2 flex flex-row items-center hidden md:block">
                  <img
                    className="h-8 w-8 rounded-full object-cover "
                    src={
                      require(`../../../uploads/${data.employee.empe_image}`)
                        .default
                    }
                    alt="profile"
                  />
                </td>
                <td>
                  <span className="text-center ml-2 font-semibold">
                    {data.employee.empe_full_name}
                  </span>
                </td>
                <td className="px-16 py-2">
                  <span className="text-center ml-2 font-semibold">
                    {data.project.proj_name}
                  </span>
                  <p className="ml-2 text-gray-500 text-sm font-semibold tracking-wide capitalize">
                    {data.project.proj_category}
                  </p>
                </td>
                <td className="px-20 py-2">
                  <span className="text-green-500">
                    {data.pras_staus === "finished" ? (
                      <div>
                        <div data-tip data-for="finished">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h5 "
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#2c3e50"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg>
                        </div>
                        <ReactTooltip
                          ReactTooltip
                          id="finished"
                          effect="solid"
                          data-tip-disable
                        >
                          <span>Finished</span>
                        </ReactTooltip>
                      </div>
                    ) : data.pras_staus === "inprogrees" ? (
                      <div>
                        <div data-tip data-for="inprogrees">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#2c3e50"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx="12" cy="12" r="9" />
                            <polyline points="12 7 12 12 15 15" />
                          </svg>
                        </div>
                        <ReactTooltip
                          ReactTooltip
                          id="inprogrees"
                          effect="solid"
                          data-tip-disable
                        >
                          <span>Inprogrees</span>
                        </ReactTooltip>
                      </div>
                    ) : (
                      <div>
                        <div data-tip data-for="start">
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
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <ReactTooltip
                          ReactTooltip
                          id="start"
                          effect="solid"
                          data-tip-disable
                        >
                          <span>Start</span>
                        </ReactTooltip>
                      </div>
                    )}
                  </span>
                  <div className="absolute ml-20 -mt-8">
                    <PencilAltIcon
                      className="-ml-1 mr-2 h-4 w-4 text-gray-500 cursor-pointer hover:text-green-500"
                      aria-hidden="true"
                      onClick={() => {
                        onEdit(data.pras_id);
                      }}
                    />
                    <TrashIcon
                      className="-ml-1 mr-2 mt-2 h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer"
                      aria-hidden="true"
                      onClick={() => {
                        if (window.confirm("Delete this record ?"))
                          onDelete(data.pras_id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal ? (
        <AddEditAssignment
          title={
            assignment.actionType === "Add"
              ? "Add Assignment"
              : "Edit Assignment"
          }
          setModal={() => setModal(false)}
          setStatus={() => setStatus(true)}
          assignment={assignment}
        />
      ) : null}
    </>
  );
};
