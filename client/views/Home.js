import React from "react";

export default function Home() {
  const judul = "pap.jpg";
  return (
    <>
      <h1>Welcome</h1>
      <img src={require(`../../uploads/${judul}`).default} alt="galaxy" />
    </>
  );
}
