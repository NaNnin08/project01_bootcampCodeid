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
    </div>
  );
}
