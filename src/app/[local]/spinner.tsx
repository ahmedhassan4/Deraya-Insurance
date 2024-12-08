import React from "react";
import "./spinner.css";

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50">
      <span className="loader"></span>
    </div>
  );
}

export default Spinner;
