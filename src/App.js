import { useState } from "react";
import "./App.css";
import { add } from "./assets";
import Header from "./components/Header";
import ListCard from "./components/ListCard";
import { cardsData, statuses } from "./data";

function App() {
  const [items, setItems] = useState(cardsData);

  const onDrop = (cardItem, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);
    const { item } = cardItem;

    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <div className="w-full flex flex-col h-screen bg-blue-300">
      <Header />
      <div className="flex space-x-3 overflow-x-auto flex-1 p-5">
        {statuses.map((status, i) => {
          return (
            <ListCard
              key={i}
              listItems={items}
              moveItem={moveItem}
              onDrop={onDrop}
              status={status}
            />
          );
        })}
        <div className="flex items-center justify-start bg-[#EBECF0] opacity-40 font-semibold text-sm text-slate-800 hover:opacity-60 w-[272px] p-2 py-3 rounded-md space-x-1 h-fit hover:cursor-pointer">
          <img src={add} alt="" className="h-4 w-4" />
          <span className="text-sm text-gray-400">Add another list</span>
        </div>
      </div>
    </div>
  );
}

export default App;
