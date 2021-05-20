import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import ApiEmployees from "./ApiEmployees";
import AddEditEmployees from "./AddEditEmployees";
import { NavContext } from "../MainLayout";

export const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const [employee, setEmployee] = useState({
    empe_id: undefined,
    actionType: undefined,
  });

  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);

  const { setBorder } = useContext(NavContext);

  useEffect(() => {
    ApiEmployees.list()
      .then((data) => {
        setEmployees(data);
        setStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setBorder({
      dasbord: false,
      employees: true,
      projects: false,
      assignment: false,
    });
  }, [status]);

  const onCreate = async () => {
    setEmployee({
      empe_id: undefined,
      actionType: "Add",
    });
    setModal(true);
  };

  const onEdit = async (id) => {
    setEmployee({
      empe_id: id,
      actionType: "Edit",
    });
    setModal(true);
  };

  const onDelete = async (id) => {
    ApiEmployees.remove(id).then((result) => {
      console.log(result);
    });
    setStatus(!status);
  };

  return (
    <>
      <Header title="Daftar Employees" setModal={() => onCreate()} />
      <div className="min-h-screen flex px-4 mt-12">
        <div className="overflow-x-auto w-full">
          <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-left">
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  Name
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  Position
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                  Department
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4"></th>
                <th className="font-semibold text-sm uppercase px-6 py-4">
                  Action
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((data) => (
                <tr key={data.empe_id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="inline-flex w-10 h-10">
                        <img
                          className="w-10 h-10 object-cover rounded-full"
                          alt="User avatar"
                          src={
                            require(`../../../uploads/${data.empe_image}`)
                              .default
                          }
                        />
                      </div>
                      <div>
                        <p className="">{data.empe_full_name}</p>
                        <p className="text-gray-500 text-sm font-semibold tracking-wide">
                          {data.empe_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="capitalize">{data.empe_position}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="capitalize">{data.empe_department_name}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a href="#" className="text-purple-800 hover:underline">
                      See
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a
                      href="#"
                      className="text-purple-800 hover:underline"
                      onClick={() => onEdit(data.empe_id)}
                    >
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a
                      href="#"
                      className="text-purple-800 hover:underline"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this item?"
                          )
                        )
                          onDelete(data.empe_id);
                      }}
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal ? (
        <AddEditEmployees
          title={
            employee.actionType === "Add" ? "Add Employee" : "Edit Employee"
          }
          setModal={() => setModal(false)}
          setStatus={() => setStatus(true)}
          employee={employee}
        />
      ) : null}
    </>
  );
};
