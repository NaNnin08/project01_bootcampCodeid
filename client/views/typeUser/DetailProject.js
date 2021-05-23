import React, { useEffect, useState } from "react";
import { CalendarIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import ApiProjects from "../projects/ApiProjects";
import ApiAssignment from "../assignment/ApiAssignment";

export const DetailProject = ({ match }) => {
  const [project, setProject] = useState({});
  const [assignment, setAssignment] = useState([]);
  const [isStatus, setIsStatus] = useState("");

  const history = useHistory();

  useEffect(() => {
    ApiProjects.findOne(match.params.id).then((result) => {
      setProject(result);
      console.log(result);
      ApiAssignment.list().then((data) => {
        const emp = data.filter((rsl) => rsl.pras_proj_id === result.proj_id);
        setAssignment(emp);
        console.log(emp);
      });

      let now = new Date();
      let start = new Date(result.proj_start_date);
      let end = new Date(result.proj_end_date);

      if (start - now > 0) {
        setIsStatus("start");
      }
      if (start - now < 0 && end - now > 0) {
        setIsStatus("inprogrees");
      }
      if (start - now < 0 && end - now < 0) {
        setIsStatus("finished");
      }
    });
  }, []);
  return (
    <div>
      <div
        className="flex md:absolute mb-5 cursor-pointer"
        onClick={() => history.goBack()}
      >
        <ArrowLeftIcon className="w-10" />
      </div>
      <div className="">
        <div className="max-w-4xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg mx-auto">
          <div id="header" className="flex relative">
            <div
              className={
                "absolute right-0 -top-2 text-white font-medium capitalize rounded px-1 py-1 " +
                (isStatus === "start"
                  ? "bg-green-500"
                  : isStatus === "inprogrees"
                  ? "bg-yellow-500"
                  : " bg-blue-500")
              }
            >
              {isStatus}
            </div>
            {project.proj_category === "software" ? (
              <div className=" text-white items-center self-center rounded py-4 px-4 shadow-xl bg-green-500 left-4 -top-6">
                {/*  <!-- svg  --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-36 mt-5"
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
            ) : project.proj_category === "maintenance" ? (
              <div className=" text-white items-center self-center rounded py-4 px-4 shadow-xl bg-blue-500 left-4 -top-6">
                {/* <!-- svg  --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-36 mt-5"
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
              <div className=" text-white items-center self-center rounded py-4 px-4 shadow-xl bg-yellow-500 left-4 -top-6">
                {/* <!-- svg  --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-36 mt-5"
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
            <div id="body" className="flex flex-col ml-5">
              <h4 id="name" className="text-xl font-semibold mb-2">
                {project.proj_name}
              </h4>
              <div className="flex">
                <CalendarIcon className="w-5" />
                <p className="ml-2">Created: {project.proj_create}</p>
              </div>
              <div className="flex flex-row">
                <CalendarIcon className="w-5" />
                <p className="ml-2">Start: {project.proj_start_date}</p>
              </div>
              <div className="flex flex-row">
                <CalendarIcon className="w-5" />
                <p className="ml-2">End: {project.proj_end_date}</p>
              </div>
              <p id="job" className="text-gray-800 mt-2">
                {project.proj_description}
              </p>
              <div
                className={
                  "mt-4 rounded capitalize w-32 text-white font-medium text-center " +
                  (project.proj_category === "software"
                    ? "bg-green-500"
                    : project.proj_category === "maintenance"
                    ? "bg-blue-500"
                    : " bg-yellow-500")
                }
              >
                {project.proj_category}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center h-screen w-full justify-center mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {assignment.map((data) => (
              <div className="max-w-xs">
                <div className="bg-white shadow-xl h-60v rounded-lg py-3 border border-gray-300">
                  <div className="photo-wrapper p-2">
                    <img
                      className="w-32 h-32 rounded mx-auto"
                      src={
                        require("../../../uploads/" + data.employee.empe_image)
                          .default
                      }
                      alt={data.employee.empe_full_name}
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                      {data.employee.empe_full_name}
                    </h3>
                    <table className="text-xs my-3">
                      <tbody>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Position
                          </td>
                          <td className="px-2 py-2 capitalize">
                            {data.employee.empe_position}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Department
                          </td>
                          <td className="px-2 py-2 capitalize">
                            {data.employee.empe_department_name}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Email
                          </td>
                          <td className="px-2 py-2">
                            {data.employee.empe_email}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
