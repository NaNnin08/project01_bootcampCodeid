import React, { useEffect, useState } from "react";
import HeaderStats from "../components/dasboard/HeaderStats";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";

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

  const projects_category = {
    outsource: datas.projects.filter(
      (data) => data.proj_category === "outsource"
    ).length,
    software: datas.projects.filter((data) => data.proj_category === "software")
      .length,
    maintenance: datas.projects.filter(
      (data) => data.proj_category === "maintenance"
    ).length,
  };

  const user_category = {
    user: datas.user.filter((data) => data.user_type.toLowerCase() === "admin")
      .length,
    admin: datas.user.filter((data) => data.user_type.toLowerCase() === "user")
      .length,
  };

  const assignment_status = {
    finished: datas.assignment.filter((data) => data.pras_staus === "finished")
      .length,
    start: datas.assignment.filter((data) => data.pras_staus === "start")
      .length,
    inprogress: datas.assignment.filter(
      (data) => data.pras_staus === "inprogrees"
    ).length,
  };

  console.log(assignment_status);

  const state_projects_category = {
    labels: ["Maintenance", "Software", "Outsource"],
    datasets: [
      {
        label: "Projects",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 0,
        data: [
          projects_category.maintenance,
          projects_category.software,
          projects_category.outsource,
        ],
        backgroundColor: ["#5d6cdf", "#40dd6f", "#f0b638"],
      },
    ],
  };

  const state_user_category = {
    labels: ["User", "Admin"],
    datasets: [
      {
        label: "Users by Category",
        backgroundColor: ["#40dd6f", "#C9DE00"],
        data: [user_category.user, user_category.admin],
      },
    ],
  };

  const state_assignment_status = {
    labels: ["Finished", "Start", "Inprogress"],
    datasets: [
      {
        label: "Projects",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 0,
        data: [
          assignment_status.finished,
          assignment_status.start,
          assignment_status.inprogress,
        ],
        backgroundColor: ["#27ce61", "#f2e636", "#f24936"],
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="absolute left-0 w-full py-3 pl-5 md:pl-12 -mt-6 bg-white shadow-md">
        <p className="opacity-50">Project Assignment</p>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
          Dasboard
        </h2>
      </div>

      <HeaderStats data={datas} />

      <div className="absolute w-1/3 -mt-20 ml-40 bg-white shadow-md">
        <h1 className="ml-2 mt-2 text-xl font-bold leading-7 text-gray-900 sm:truncate">
          Project by Category
        </h1>
        <div className="px-10 pt-3">
          <Bar
            data={state_projects_category}
            options={{
              title: {
                display: true,
                text: "Projects by category",
                fontSize: 11,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>

      <div className="absolute w-1/3 right-0 -mt-14 mr-40 bg-white shadow-md">
        <h1 className="ml-2 mt-2 text-xl font-bold leading-7 text-gray-900 sm:truncate">
          User by Category
        </h1>
        <div className="px-10 pt-3">
          <Doughnut
            data={state_user_category}
            options={{
              title: {
                display: true,
                text: "Users by Category",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>

      <div className="absolute w-1/3 mt-44 ml-40 bg-white shadow-md">
        <h1 className="ml-2 mt-2 text-xl font-bold leading-7 text-gray-900 sm:truncate">
          Assignment by Status
        </h1>
        <div className="px-10 pt-3">
          <Bar
            data={state_assignment_status}
            options={{
              title: {
                display: true,
                text: "Projects by category",
                fontSize: 11,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
