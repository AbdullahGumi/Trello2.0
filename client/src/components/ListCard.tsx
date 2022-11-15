import { useState, useRef, useEffect } from "react";
import { add, close, closeRed } from "../assets";
import Card from "./Card";
import { ItemTypes } from "../Constants";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addNewCard, fetchCards, selectCards } from "../features/cardSlice";
import { changeListName, deleteSingleList } from "../features/listCardSlice";

const ListCard = ({ onDrop, listDetails: { listName, _id } }) => {
  const [isTextFieldOpened, setTextFieldOpened] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [newListTitle, setNewListTitle] = useState(listName);
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const cards = useSelector((state) => selectCards(state));
  const [_, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => {
      onDrop(item, listName);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addCard = () => {
    if (cardTitle) {
      setCardTitle("");
      setTextFieldOpened(false);
      dispatch(
        addNewCard({
          listName,
          title: cardTitle,
        })
      );
    }
  };

  const deleteList = () => {
    dispatch(deleteSingleList(_id));
  };

  const updateListTitle = () => {
    dispatch(
      changeListName({ newListTitle, previousListTitle: listName, _id })
    );
  };

  useEffect(() => {
    //fetch only cards specific to list
    dispatch(fetchCards());
  }, [listName]);

  return (
    <div
      ref={drop}
      className="flex flex-col bg-[#EBECF0] w-[272px] p-2 py-3 rounded-md max-h-[80%] h-fit space-y-2 flex-shrink-0"
    >
      <div className="flex justify-between items-center space-x-2">
        <input
          value={newListTitle}
          className="flex-1 rounded-sm font-semibold text-sm text-slate-800 px-2 bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          onChange={(e) => setNewListTitle(e.target.value)}
          onBlur={() => updateListTitle()}
        />
        <img
          onClick={deleteList}
          src={closeRed}
          alt=""
          className="h-3 w-3 hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col space-y-3 h-full w-full overflow-y-auto px-1">
        {cards
          .filter((item) => item.listName === listName)
          .map((item) => (
            <Card
              key={item._id}
              item={item}
              // listName={listName}
            />
          ))}
        {isTextFieldOpened && (
          <input
            ref={ref}
            autoFocus
            onKeyPress={(e) => e.key === "Enter" && addCard()}
            onChange={(e) => setCardTitle(e.target.value)}
            value={cardTitle}
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
              cardTitle ? "bg-[#0079BF]" : "bg-gray-300"
            } text-white hover:cursor-pointer`}
          >
            Add card
          </span>
          <img
            onClick={() => {
              setCardTitle("");
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
