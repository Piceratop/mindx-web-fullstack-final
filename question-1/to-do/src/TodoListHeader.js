import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "./AppContext";

const Header = ({ withDone, setWithDone }) => {
    const navigate = useNavigate();

    const {
        state: { tasks },
    } = useContext(AppContext);

    const unfinishedTasks = tasks.filter((task) => !task.isFinished);
    const taskCount = unfinishedTasks.length;

    const taskPlural = taskCount <= 1 ? "task" : "tasks";

    return (
        <div className="header">
            <input
                type="checkbox"
                checked={!withDone && "hello"}
                onChange={() => {
                    setWithDone((withDone) => !withDone);
                    navigate(`?withDone=${!withDone}`);
                }}
            />
            <label htmlFor="notFinishedOnly">Not finished only</label>
            <br />
            You have {taskCount} {taskPlural} left!
        </div>
    );
};

export default Header;
