import React from "react";

export const example = () => {
  return (
    <div className="grid grid-rows-layout grid-cols-1 h-100v">
      <header className="row-span-1 bg-black text-white flex items-center">
        <h1 className="">Agaha</h1>
      </header>
      <main className="row-span-1">
        <h1 className="min-h-screen"></h1>
      </main>
      <footer className="row-span-1 bg-black text-white">footer</footer>
    </div>
  );
};
