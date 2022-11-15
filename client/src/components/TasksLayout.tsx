import { useEffect, useRef, useState } from "react";
import ListCard from "./ListCard";
import { add, close } from "../assets";

//redux
import { useDispatch, useSelector } from "react-redux";
import { moveCardToAnotherList } from "../features/cardSlice";
import {
  addListCard,
  fetchListCards,
  selectListCards,
} from "../features/listCardSlice";

const TasksLayout = () => {
  const dispatch = useDispatch();
  const listCards = useSelector((state) => selectListCards(state));
  const listTitleRef = useRef<any>(null);

  const [newListTitle, setNewListTitle] = useState("");
  const [isAddListOpened, setIsAddListOpened] = useState(false);

  const onDrop = (cardItem, listName) => {
    const { item } = cardItem;
    dispatch(moveCardToAnotherList({ item, listName }));
  };

  const addList = () => {
    if (newListTitle) {
      setNewListTitle("");
      setIsAddListOpened(false);
      dispatch(addListCard({ listName: newListTitle }));
    }
  };

  const renderListCards = () => {
    return listCards.map((details, i) => {
      return <ListCard key={i} onDrop={onDrop} listDetails={details} />;
    });
  };

  useEffect(() => {
    dispatch(fetchListCards());
  }, []);

  return (
    <div className="flex space-x-3 overflow-x-auto flex-1 p-5">
      {renderListCards()}
      {!isAddListOpened ? (
        <div
          onClick={() => {
            listTitleRef.current?.focus();
            setIsAddListOpened(!isAddListOpened);
          }}
          className="flex items-center justify-start bg-[#EBECF0] opacity-40 font-semibold text-sm text-slate-800 hover:opacity-60 w-[272px] p-2 py-3 rounded-md space-x-1 h-fit hover:cursor-pointer flex-shrink-0"
        >
          <img src={add} alt="" className="h-4 w-4" />
          <span className="text-sm text-gray-400">Add another list</span>
        </div>
      ) : (
        <div className="flex flex-col bg-[#EBECF0] w-[272px] p-2 py-3 rounded-md max-h-[80%] h-fit space-y-2 flex-shrink-0">
          <input
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            autoFocus
            onKeyPress={(e) => e.key === "Enter" && addList()}
            ref={listTitleRef}
            type={"text"}
            className="focus:outline-none"
          />
          <div className="flex space-x-2 items-center px-1">
            <span
              onClick={() => addList()}
              className={`rounded-sm p-1 ${
                newListTitle ? "bg-[#0079BF]" : "bg-gray-300"
              } text-white hover:cursor-pointer`}
            >
              Add list
            </span>
            <img
              onClick={() => {
                setNewListTitle("");
                setIsAddListOpened(false);
              }}
              src={close}
              alt=""
              className="h-5 w-5 hover:cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksLayout;
