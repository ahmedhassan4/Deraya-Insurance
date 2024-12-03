import React from "react";
import { Loader } from "rizzui";

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50">
      <Loader variant="spinner" size="xl" />
    </div>
  );
}

export default Spinner;
