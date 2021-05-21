import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ApiEmployees from "./ApiEmployees";

export const DetailEmployee = ({ match }) => {
  const [employee, setEmployee] = useState({});
  const [blob, setBlob] = useState([]);

  let history = useHistory();

  useEffect(() => {
    ApiEmployees.findOne(match.params.id).then((data) => {
      console.log(data);
      setEmployee(data);

      ApiEmployees.showImage(
        `/api/employees/photo/` + data.empe_image,
        data.empe_image
      ).then((result) => {
        if (result.error) {
          console.log("Get Image Failed");
        } else {
          setBlob({ ...blob, image: URL.createObjectURL(result) });
        }
      });
    });
  }, []);
  return (
    <div>
      <button
        className="md:absolute mb-5 bg-gray-300 px-6 py-3 rounded-xl hover:bg-gray-400"
        onClick={() => history.goBack()}
      >
        Back
      </button>

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="inline-flex w-28 absolute md:top-28 xl:right-52 lg:right-40 md:right-10 right-5 top-16 shadow">
          <img className="object-cover rounded" alt="" src={blob.image} />
        </div>
        <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <h2 className="text-2xl ">Employee Information</h2>
            <p className="text-sm text-gray-500">
              Employee details and application.
            </p>
          </div>
          <div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Full name</p>
              <p>{employee.empe_full_name}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Birtday</p>
              <p>{employee.empe_birtdate}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Hiredate</p>
              <p>{employee.empe_hiredate}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Position</p>
              <p className="capitalize">{employee.empe_position}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Department</p>
              <p className=" capitalize">{employee.empe_department_name}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Email Address</p>
              <p>{employee.empe_email}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Salary</p>
              <p>$ {employee.empe_salary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
