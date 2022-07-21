import React from "react";
import { add } from "../assets";
import Card from "./Card";
import { ItemTypes } from "../Constants";
import { useDrop } from "react-dnd";

const ListCard = ({ onDrop, status: { status }, moveItem, listItems }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="flex flex-col bg-[#EBECF0] w-[272px] p-2 py-3 rounded-md max-h-[80%] h-fit space-y-1"
    >
      <span className="font-semibold text-sm text-slate-800 px-2">
        {status}
      </span>
      <div className="flex flex-col space-y-3 h-full w-full overflow-y-auto px-1">
        {listItems
          .filter((item) => item.status === status)
          .map((item, i) => (
            <Card
              key={item.id}
              moveItem={moveItem}
              index={i}
              item={item}
              status={status}
            />
          ))}
      </div>
      <div className="flex items-center space-x-2 hover:cursor-pointer hover:bg-gray-200">
        <img src={add} alt="" className="h-4 w-4" />
        <span className="text-sm text-gray-400">Add a card</span>
      </div>
    </div>
  );
};

export default ListCard;
