import React from "react";
import { trello } from "../assets";

const Header = () => {
  return (
    <div className="w-full flex justify-between bg-[#1E88E5] items-center px-5 py-1">
      <div className="flex items-center justify-between space-x-1">
        <img src={trello} alt="" className="w-6 h-6" />
        <span className="font-[Helvetica Neue] font-bold text-xl">Trello</span>
      </div>
      <div className="rounded-full h-10 w-10 bg-red-50 flex items-center justify-center">
        <span className="font-bold font-[Helvetica Neue]">AA</span>
      </div>
    </div>
  );
};

export default Header;
