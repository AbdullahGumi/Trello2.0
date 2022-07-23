import { ItemTypes } from "../Constants";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
const Card = ({ item }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex bg-white w-full p-1 shadow-sm  rounded-sm hover:cursor-pointer hover:bg-gray-100 ${
        isDragging ? "opacity-0" : "opacity-100"
      }`}
    >
      {item.title}
    </div>
  );
};

export default Card;
