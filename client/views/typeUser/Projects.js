import React, { useEffect, useState } from "react";
import ApiProjects from "../projects/ApiProjects";

export function UserProjects() {
  const [projects, setProjects] = useState([]);
  const [isHover, setIsHover] = useState({});

  useEffect(() => {
    ApiProjects.list()
      .then((data) => {
        setProjects(data);

        for (let i = 0; i < data.length; i++) {
          isHover[i] = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(isHover);

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {projects.map((data, index) => (
            <div
              className="relative flex flex-col items-center justify-around p-4 mr-4 w-80 h-80 rounded-2xl mb-5"
              style={{ transform: "translate(0px, 0px)", zIndex: 1 }}
              onMouseEnter={() => setIsHover({ ...isHover, [index]: true })}
              onMouseLeave={() => setIsHover({ ...isHover, [index]: false })}
            >
              <div
                className={
                  "absolute z-0 px-36 py-32 text-white transform scale-x-105 scale-y-95 rounded-xl rotate-2 " +
                  (data.proj_category === "software"
                    ? "bg-green-500"
                    : data.proj_category === "maintenance"
                    ? "bg-yellow-500"
                    : "bg-blue-500")
                }
                style={{ zIndex: -1 }}
              ></div>
              {isHover[index] ? (
                <div className="absolute z-50 opacity-70 transform scale-x-105 scale-y-95 bg-black rounded-xl px-28 py-28 items-center">
                  <button className="text-white border px-3 py-1">
                    Detail
                  </button>
                </div>
              ) : null}
              <div
                className="absolute z-0 transform scale-x-105 scale-y-95 bg-white rounded-xl px-36 py-32"
                style={{ zIndex: -1 }}
              ></div>
              <h3 className="z-10 p-2 text-2xl font-semibold text-green-900">
                {data.proj_name}
              </h3>
              {data.proj_category === "software" ? (
                <div className="z-10 p-2 text-green-900">
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
                <div className="z-10 p-2 text-green-900">
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
                <div className="z-10 p-2 text-green-900">
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
              <div className="z-10 p-2 text-sm text-center text-green-900">
                {data.proj_description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
