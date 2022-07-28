import "./App.css";
import Header from "./components/Header";
import TasksLayout from "./components/TasksLayout";

function App() {
  return (
    <div className="w-full flex flex-col h-screen bg-blue-300 flex-1">
      <Header />
      <TasksLayout />
    </div>
  );
}

export default App;
