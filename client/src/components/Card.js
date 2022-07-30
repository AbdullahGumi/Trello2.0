import { useLayoutEffect, useRef, useState } from "react";
import { ItemTypes } from "../Constants";

import Modal from "react-modal";
import dayjs from "dayjs";
import { useDrag, useDrop } from "react-dnd";
import { closeSlate } from "../assets";
import { useDispatch } from "react-redux";
import { updateCardDetails } from "../features/cardSlice";

const Card = ({ item }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditingDesc, setEditingDesc] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const dispatch = useDispatch();

  const ref = useRef(null);
  const descriptionRef = useRef(null);
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

  const updateTitle = () => {
    dispatch(updateCardDetails({ ...item, title }));
  };

  const updateDescription = () => {
    dispatch(updateCardDetails({ ...item, description }));
  };

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
      <Modal
        isOpen={modalIsOpen}
        onRequestClosescloseSlate={() => setIsOpen(false)}
        style={customStyles}
      >
        <div className="flex flex-col space-y-6 h-full  justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between items-center space-x-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => updateTitle()}
                className="text-slate-800 font-semibold text-lg flex-1 bg-transparent px-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm"
              />
              <img
                onClick={() => {
                  setIsOpen(false);
                }}
                src={closeSlate}
                alt=""
                className="h-8 w-8 hover:cursor-pointer hover:bg-slate-300 rounded-full p-2"
              />
            </div>
            <span className="pl-2 text-xs text-slate-800 ">
              in list {item.listName}
            </span>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-2 items-center  text-slate-800 font-semibold">
              <span>Description</span>
              <span
                onClick={() => {
                  descriptionRef.current?.focus();
                  setEditingDesc(true);
                }}
                className={`${
                  isEditingDesc && "hidden"
                } rounded-sm bg-gray-300 px-2 py-1 hover:cursor-pointer hover:bg-gray-400 font-light`}
              >
                Edit
              </span>
            </div>
            {!isEditingDesc ? (
              <span
                onClick={() => {
                  setEditingDesc(true);
                  descriptionRef.current?.focus();
                }}
              >
                {item.description}
              </span>
            ) : (
              <textarea
                ref={descriptionRef}
                autoFocus
                className={` text-slate-800 font-semibold text-lg flex-1 bg-transparent px-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-sm`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            )}

            <div className={`${!isEditingDesc && "hidden"} flex space-x-3`}>
              <span
                onClick={() => {
                  updateDescription();
                  setEditingDesc(false);
                }}
                className={`rounded-sm bg-[#026AA7] px-2 py-1 hover:cursor-pointer font-light text-white text-base`}
              >
                Save
              </span>
              <span
                onClick={() => {
                  setEditingDesc(false);
                }}
                className={`rounded-sm bg-gray-300 px-2 py-1 hover:cursor-pointer hover:bg-gray-400 font-light`}
              >
                Cancel
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col text-slate-800 font-semibold">
              <span>Activity</span>
              {}
              <span className="text-sm mt-1">
                Created at:{" "}
                {dayjs(item.createdAt).format("MMMM D YYYY, h:mm:ss a")}
              </span>
              <span className="text-sm">
                Last updated:{" "}
                {dayjs(item.updatedAt).format("MMMM D YYYY, h:mm:ss a")}
              </span>
            </div>
          </div>
          <span className="self-end mt-auto text-red-500 hover:cursor-pointer hover:bg-red-300 p-1 rounded-sm">
            Delete
          </span>
        </div>
      </Modal>
    </>
  );
};

export default Card;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    backgroundColor: "#eee",
    width: "50%",
    height: "60%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
