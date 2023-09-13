import { useContext, useState } from "react";
import { AppContext } from "./AppContext";

const Form = () => {
    const { dispatch } = useContext(AppContext);
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = e.target.elements.task.value;
        dispatch({ type: "ADD_TASK", payload: { task, dueDate } });
        e.target.reset();
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input name="task" placeholder="Enter task ..." />
            <input
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={handleDueDateChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
