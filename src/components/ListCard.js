import React from "react";
import { add } from "../assets";
import Card from "./Card";

const ListCard = ({ title }) => {
  return (
    <div className="flex flex-col bg-[#EBECF0] w-[272px] p-2 py-3 rounded-md max-h-[80%] h-fit space-y-1">
      <span className="font-semibold text-sm text-slate-800 px-2">Urgent</span>
      <div className="flex flex-col space-y-3 h-full w-full overflow-y-auto px-1">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex items-center space-x-2 hover:cursor-pointer hover:bg-gray-200">
        <img src={add} alt="" className="h-4 w-4" />
        <span className="text-sm text-gray-400">Add a card</span>
      </div>
    </div>
  );
};

export default ListCard;
