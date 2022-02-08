import React from "react";

const List = ({
  tasks,
  deleteTask,
  taskEdit,
  setTaskEdit,
  showEdit,
  openEdit,
  handleEdit,
}) => {
  return (
    <ul>
      {tasks
        ? tasks.map((element, index) => {
            const { id, task } = element;
            return (
              <li key={id}>
                {showEdit !== id && <span className="task">{task}</span>}

                {showEdit === id && (
                  <form>
                    <input
                      className="taskEdit"
                      type="text"
                      name="taskEdit"
                      placeholder="type your edit"
                      value={taskEdit}
                      onChange={(e) => setTaskEdit(e.target.value)}
                    />
                    <button
                      className="btn"
                      onClick={(e) => handleEdit(e, index, id)}
                    >
                      submit edit
                    </button>
                    <button className="btn" onClick={() => openEdit(id)}>
                      cancel
                    </button>
                  </form>
                )}
                {showEdit !== id && (
                  <>
                    <button className="btn" onClick={() => openEdit(id)}>
                      edit
                    </button>
                    <button onClick={() => deleteTask(id)} className="btn">
                      delete
                    </button>
                  </>
                )}
              </li>
            );
          })
        : ""}
    </ul>
  );
};

export default List;
