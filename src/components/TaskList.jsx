import { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState({ index: null, text: "" });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTask = (index) => {
    setEditedTask({ index, text: tasks[index].text });
  };

  const saveEditedTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editedTask.index].text = editedTask.text;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditedTask({ index: null, text: "" });
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="task-list">
      <div className="mt-4">
        {tasks.map((task, index) => (
          <div key={index} className="border py-2 rounded-full mx-10 my-2">
            <div className="flex justify-between mx-12 text-xl font-semibold text-white">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                className=""
              />
              {editedTask.index === index ? (
                <div>
                  <input
                    type="text"
                    value={editedTask.text}
                    className="text-black pl-1 items-center text-center rounded-md w-auto"
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, text: e.target.value })
                    }
                  />
                  <button
                    onClick={saveEditedTask}
                    className="text-white ml-2 items-center text-center"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>
              )}
              <button
                onClick={() => editTask(index)}
                className=" hover:text-yellow-500 transition-all duration-200"
              >
                <AiTwotoneEdit />
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="hover:text-red-600 transition-all duration-200"
              >
                <ImCross />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
