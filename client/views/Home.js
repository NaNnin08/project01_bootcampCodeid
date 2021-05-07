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

  const employees_department = {
    it_director: datas.employees.filter(
      (data) =>
        data.empe_position === "director" && data.empe_department_name === "it"
    ).length,
    it_manager: datas.employees.filter(
      (data) =>
        data.empe_position === "manager" && data.empe_department_name === "it"
    ).length,
    it_programmer: datas.employees.filter(
      (data) =>
        data.empe_position === "programmer" &&
        data.empe_department_name === "it"
    ).length,
    hr_director: datas.employees.filter(
      (data) =>
        data.empe_position === "director" &&
        data.empe_department_name === "human resource"
    ).length,
    hr_manager: datas.employees.filter(
      (data) =>
        data.empe_position === "manager" &&
        data.empe_department_name === "human resource"
    ).length,
    hr_programmer: datas.employees.filter(
      (data) =>
        data.empe_position === "programmer" &&
        data.empe_department_name === "human resource"
    ).length,
    sales_director: datas.employees.filter(
      (data) =>
        data.empe_position === "director" &&
        data.empe_department_name === "sales"
    ).length,
    sales_manager: datas.employees.filter(
      (data) =>
        data.empe_position === "manager" &&
        data.empe_department_name === "sales"
    ).length,
    sales_programmer: datas.employees.filter(
      (data) =>
        data.empe_position === "programmer" &&
        data.empe_department_name === "sales"
    ).length,
  };

  console.log(employees_department);

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

  const state_employee_department = {
    labels: ["It", "Human Resource", "Sales"],
    datasets: [
      {
        label: "Director",
        data: [
          employees_department.it_director,
          employees_department.hr_director,
          employees_department.sales_director,
        ],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Manager",
        data: [
          employees_department.it_manager,
          employees_department.hr_manager,
          employees_department.sales_manager,
        ],
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "Programmer",
        data: [
          employees_department.it_programmer,
          employees_department.hr_programmer,
          employees_department.sales_programmer,
        ],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options_employee_department = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
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

      <div className="flex flex-col min-h-screen -mt-32 md:-mt-0 items-center md:items-start">
        <div className="md:absolute md:w-1/3 w-5/6 md:-mt-20 md:ml-40 bg-white shadow-md">
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

        <div className="md:absolute mt-5 w-5/6 md:w-1/3 right-0 md:-mt-14 md:mr-40 bg-white shadow-md flex-1">
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

        <div className="md:absolute w-5/6 mt-5 md:w-1/3 md:mt-44 md:ml-40 bg-white shadow-md flex-1">
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

        <div className=" mt-5 md:mt-16 w-5/6 md:w-4/5 md:ml-56 flex-1">
          <div className="md:relative  md:mt-96 md:mr-40 bg-white shadow-md">
            <h1 className="ml-2 mt-2 text-xl font-bold leading-7 text-gray-900 sm:truncate">
              Employees by Department
            </h1>
            <div className="px-10 pt-3">
              <Bar
                data={state_employee_department}
                options={options_employee_department}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
