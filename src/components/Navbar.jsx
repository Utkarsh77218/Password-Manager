import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-around items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
            Pass<span className="text-green-500">OP</span>
          <span className="text-green-500">/&gt;</span>
        </div>
        <button className="text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-1 ring-white">
          <img className="invert p-1 w-10" src="/icons/github.svg" alt="github" />
          <span className="font-bold px-2">Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
