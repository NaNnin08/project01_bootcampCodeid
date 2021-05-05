import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative clear-both bg-white relative pt-1 border-b-2 border-green-700">
        <div className="container mx-auto px-6">
          <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
            <div className="sm:w-2/3 text-center py-3">
              <p className="text-sm text-green-700 font-bold mb-2">
                © 2021 by Nida Sunandar
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
