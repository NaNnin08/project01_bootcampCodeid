import React, { useEffect, useState } from "react";
import HeaderStats from "../components/dasboard/HeaderStats";
import axios from "axios";
import ChartStats from "../components/dasboard/ChartStats";

export default function Home() {
  const [datas, setDatas] = useState({
    employees: [],
    projects: [],
    assignment: [],
    user: [],
  });

  const fetchData = () => {
    const employees = axios.get(`/api/employees/`);
    const project = axios.get(`/api/projects/`);
    const assignment = axios.get(`/api/projects-assignment/`);
    const user = axios.get(`/api/users/all/`);

    axios.all([employees, project, assignment, user]).then(
      axios.spread((...allData) => {
        const employees = allData[0].data;
        const projects = allData[1].data;
        const assignment = allData[2].data;
        const user = allData[3].data;

        setDatas({
          employees: employees,
          projects: projects,
          assignment: assignment,
          user: user,
        });
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="absolute left-0 w-full py-3 pl-5 md:pl-12 -mt-6 bg-white shadow-md">
        <p className="opacity-50">Project Assignment</p>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
          Dasboard
        </h2>
      </div>

      <HeaderStats data={datas} />

      <ChartStats data2={datas} />

      <div className="flex px-4 mt-12">
        <div className="overflow-x-auto w-full">
          <table className="mx-auto max-w-4xl w-1/2 whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-left">
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  Projects
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  Employees
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {datas.projects.map((data) => (
                <tr key={data.proj_id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="">{data.proj_name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {datas.assignment.map(
                      (data_ass) =>
                        data_ass.pras_proj_id === data.proj_id && (
                          <p className="">{data_ass.employee.empe_full_name}</p>
                        )
                    )}
                  </td>
                  <td className="px-6 py-4 ">
                    {datas.assignment.map(
                      (data_ass) =>
                        data_ass.pras_proj_id === data.proj_id && (
                          <p className="">{data_ass.pras_staus}</p>
                        )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
