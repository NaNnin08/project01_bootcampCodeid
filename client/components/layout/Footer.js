import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-2 pb-2">
        <div className="container mx-auto">
          <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-2">
              <p className="text-sm text-green-700 font-bold">
                © 2021 by Nida Sunandar
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
