import { useState } from "react";

import { SiAddthis } from "react-icons/si";

function AddTask() {
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim() === "") {
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({ text: taskText, completed: false });

    // Save the updated tasks array to Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    setTaskText("");
  };

  return (
    <div className="items-center text-center flex gap-4 justify-center">
      <input
        type="text"
        placeholder="Add a new task"
        value={taskText}
        className="p-2 rounded-md w-1/2"
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button
        onClick={handleAddTask}
        className="text-white  text-4xl bg-black rounded-md cursor-pointer hover:bg-green-700 hover:text-black transition-all duration-300 "
      >
        <SiAddthis />
      </button>
    </div>
  );
}

export default AddTask;
