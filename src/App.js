import "./App.css";
import { add } from "./assets";
import Header from "./components/Header";
import ListCard from "./components/ListCard";

function App() {
  return (
    <div className="w-full flex flex-col h-screen bg-blue-300">
      <Header />
      <div className="flex space-x-3 overflow-x-auto flex-1 p-5">
        <ListCard />
        <ListCard />
        <ListCard />
        <div className="flex items-center justify-start bg-[#EBECF0] opacity-40 font-semibold text-sm text-slate-800 hover:opacity-60 w-[272px] p-2 py-3 rounded-md space-x-1 h-fit hover:cursor-pointer">
          <img src={add} alt="" className="h-4 w-4" />
          <span className="text-sm text-gray-400">Add another list</span>
        </div>
      </div>
    </div>
  );
}

export default App;
