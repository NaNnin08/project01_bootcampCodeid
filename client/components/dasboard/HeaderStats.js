import React, { useEffect, useState } from "react";
// components

import CardStats from "./CardStats";
import axios from "axios";

// api

export default function HeaderStats(props) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-20 pb-32 pt-16">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Employees"
                  statTitle={props.data.employees.length}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Projects"
                  statTitle={props.data.projects.length}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Assigntment"
                  statTitle={props.data.assignment.length}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="User"
                  statTitle={props.data.user.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
