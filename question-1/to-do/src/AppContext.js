import { createContext, useReducer } from "react";

const storedTasks = JSON.parse(localStorage.getItem("tasks"));
const initialState = {
    tasks: storedTasks ? storedTasks : [],
};

export const AppContext = createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            const { task, dueDate } = action.payload;
            const newTask = {
                id: state.tasks.length + 1,
                name: task,
                isFinished: false,
                dueDate: dueDate,
            };
            const updatedTasks = [...state.tasks, newTask];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return {
                ...state,
                tasks: updatedTasks,
            };
        case "TOGGLE_IS_FINISHED":
            const updatedTaskList = state.tasks.map((task) =>
                task.id === action.payload
                    ? { ...task, isFinished: !task.isFinished }
                    : task
            );
            localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
            return {
                ...state,
                tasks: updatedTaskList,
            };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
