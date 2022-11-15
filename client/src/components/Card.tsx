import { useLayoutEffect, useRef, useState } from "react";
import { ItemTypes } from "../Constants";

import Modal from "react-modal";

import { useDrag, useDrop } from "react-dnd";
import EditCardModal from "./EditCardModal";

const Card = ({ item }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
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

  useLayoutEffect(() => {
    Modal.setAppElement("#root");
    Modal.defaultStyles.overlay.backgroundColor = "black";
    Modal.defaultStyles.overlay.opacity = "0.9";
  }, []);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        ref={ref}
        className={`flex bg-white w-full p-1 shadow-sm  rounded-sm hover:cursor-pointer hover:bg-gray-100 ${
          isDragging ? "opacity-0" : "opacity-100"
        }`}
      >
        {item.title}
      </div>
      <EditCardModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        item={item}
      />
    </>
  );
};

export default Card;
