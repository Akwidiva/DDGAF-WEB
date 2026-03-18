import React from "react";
import logo from "../Pictures/logo.png"; // Import de l'image PNG
import logo_CAA from "../Pictures/logo_CAA-big.png"; // Import de l'image PNG

export default function ApplicationLogo() {
  return (
    <div className="flex align-center">
      <img
        src={logo_CAA}
        alt="Logo de l'application"
        className="h-auto w-auto"
        style={{ maxWidth: 180, height: "auto" }}
      />
    </div>
  );
}

