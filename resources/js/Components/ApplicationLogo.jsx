import React from "react";
// import logo from "../Pictures/logo.png"; // Import de l'image PNG
import logo from "../Pictures/logo_CAA-big.png"; // Import de l'image PNG

export default function ApplicationLogo() {
  return (
    <div>
      <img src={logo} alt="Logo de l'application" />
    </div>
  );
}

