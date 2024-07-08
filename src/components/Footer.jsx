import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-green-500">&lt;</span>
        Pass<span className="text-green-500">OP</span>
        <span className="text-green-500">/&gt;</span>
      </div>
      <div>All Rights Reserved | &copy;PassOP.inc</div>
    </div>
  );
};

export default Footer;
