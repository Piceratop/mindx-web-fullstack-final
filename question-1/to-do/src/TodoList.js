import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { AppContext } from "./AppContext";

const TodoList = ({ withDone }) => {
    const {
        state: { tasks },
        dispatch,
    } = useContext(AppContext);

    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        setFilteredTasks(
            withDone ? tasks : tasks.filter((task) => !task.isFinished)
        );
    }, [tasks, withDone]);

    const toggleIsFinished = (taskId) => {
        dispatch({ type: "TOGGLE_IS_FINISHED", payload: taskId });
    };

    const getDaysLeft = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const timeDiff = due.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysLeft === 0) {
            return "due today";
        } else if (daysLeft < 0) {
            return "past due";
        } else {
            return `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
        }
    };

    return (
        <div className="todo-list-container">
            {filteredTasks.map((task) => (
                <div
                    key={task.id}
                    className={`todo-item-container ${
                        task.isFinished ? "done" : ""
                    }`}
                >
                    {task.isFinished ? (
                        <FaRegCheckCircle
                            color="#9a9a9a"
                            className="item-done-button"
                            onClick={() => toggleIsFinished(task.id)}
                        />
                    ) : (
                        <FaRegCircle
                            color="#9a9a9a"
                            className="item-done-button"
                            onClick={() => toggleIsFinished(task.id)}
                        />
                    )}
                    <div className="item-title">{task.name}</div>
                    <div className="item-due">{getDaysLeft(task.dueDate)}</div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
