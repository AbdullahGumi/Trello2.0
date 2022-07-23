import React, { useState, useRef } from "react";
import { add, close } from "../assets";
import Card from "./Card";
import { ItemTypes } from "../Constants";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addCardToList, selectCards } from "../features/cardSlice";
import { v4 as uuidv4 } from "uuid";

const ListCard = ({ onDrop, status: { status } }) => {
  const [isTextFieldOpened, setTextFieldOpened] = useState(false);
  const [cardText, setCardText] = useState("");
  const ref = useRef(null);
  const dispatch = useDispatch();
  const cards = useSelector((state) => selectCards(state));
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addCard = () => {
    if (cardText) {
      setCardText("");
      setTextFieldOpened(false);
      dispatch(
        addCardToList({
          id: uuidv4(),
          icon: "⭕️",
          status,
          title: cardText,
          content: "Finish reading Intro to UI/UX",
        })
      );
    }
  };

  return (
    <div
      ref={drop}
      className="flex flex-col bg-[#EBECF0] w-[272px] p-2 py-3 rounded-md max-h-[80%] h-fit space-y-2"
    >
      <span className="font-semibold text-sm text-slate-800 px-2">
        {status}
      </span>
      <div className="flex flex-col space-y-3 h-full w-full overflow-y-auto px-1">
        {cards
          .filter((item) => item.status === status)
          .map((item, i) => (
            <Card key={item.id} item={item} status={status} />
          ))}
        {isTextFieldOpened && (
          <input
            ref={ref}
            autoFocus
            onChange={(e) => setCardText(e.target.value)}
            value={cardText}
            type="text"
            className="flex bg-white  p-1 shadow-sm  rounded-sm focus:outline-none"
          />
        )}
      </div>
      {isTextFieldOpened ? (
        <div className="flex space-x-2 items-center px-1">
          <span
            onClick={addCard}
            className={`rounded-sm p-1 ${
              cardText ? "bg-[#0079BF]" : "bg-gray-300"
            } text-white hover:cursor-pointer`}
          >
            Add card
          </span>
          <img
            onClick={() => {
              setCardText("");
              setTextFieldOpened(false);
            }}
            src={close}
            alt=""
            className="h-5 w-5 hover:cursor-pointer"
          />
        </div>
      ) : (
        <div
          onClick={() => {
            ref.current?.focus();
            setTextFieldOpened(!isTextFieldOpened);
          }}
          className="flex items-center space-x-2 hover:cursor-pointer hover:bg-gray-200"
        >
          <img src={add} alt="" className="h-4 w-4" />
          <span className="text-sm text-gray-400">Add a card</span>
        </div>
      )}
    </div>
  );
};

export default ListCard;
