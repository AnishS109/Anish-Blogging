import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-17 border-t-4 border-b-4 border-black"></div>
    </div>
  );
};

export default Loader;
