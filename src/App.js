import { useEffect, useState } from "react";
import List from "./List";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskEdit, setTaskEdit] = useState("");
  const [showEdit, setShowEdit] = useState("");
  const [error, setError] = useState("");

  const openEdit = (id) => {
    if (showEdit === id) {
      return setShowEdit("");
    }
    return setShowEdit(id);
  };

  const getTasks = () => {
    const storage = JSON.parse(localStorage.getItem("task"));
    if (storage) {
      setTasks(storage);
    } else {
      setTask([]);
    }
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => {
      if (task.id !== id) {
        return task;
      }
      return "";
    });
    setTasks(newTasks);
    localStorage.setItem("task", JSON.stringify(newTasks));
    setError("task deleted");
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  const clearAll = () => {
    localStorage.removeItem("task");
    setTasks([]);
    setError("list cleared");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      const element = {
        id: new Date().getTime().toString(),
        task,
      };
      setTask("");
      setTasks([...tasks, element]);
      localStorage.setItem("task", JSON.stringify([...tasks, element]));
      setError("task added");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      setError("type a task pls");
    }
  };

  const handleEdit = (e, index, id) => {
    e.preventDefault();
    if (taskEdit) {
      const newElement = {
        id,
        task: taskEdit,
      };
      tasks.splice(index, 1, newElement);
      setTaskEdit("");
      localStorage.setItem("task", JSON.stringify(tasks));
      setShowEdit("");
      setError("task edited");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      setError("type a real edit pls");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main>
      <section className="container">
        <h1>ToDoList</h1>
        {error && <h4>{error}</h4>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            placeholder="type a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" className="btn form">
            add a task
          </button>
        </form>
      </section>
      <List
        tasks={tasks}
        deleteTask={deleteTask}
        taskEdit={taskEdit}
        setTaskEdit={setTaskEdit}
        showEdit={showEdit}
        openEdit={openEdit}
        handleEdit={handleEdit}
      />
      {tasks.length > 0 ? (
        <button className="btn clear" onClick={() => clearAll()}>
          clear list
        </button>
      ) : (
        ""
      )}
    </main>
  );
}

export default App;
