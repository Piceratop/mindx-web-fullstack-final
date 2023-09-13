import { useState } from "react";
import "./styles.css";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [withDone, setWithDone] = useState(
        queryParams.get("withDone") === "true" ? true : false
    );

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home withDone={withDone} setWithDone={setWithDone} />
                    }
                />
            </Routes>
        </div>
    );
}

const Home = ({ withDone, setWithDone }) => {
    return (
        <div className="App">
            <div className="container">
                <TodoListHeader withDone={withDone} setWithDone={setWithDone} />
                <TodoList withDone={withDone} />
                <Form />
            </div>
            <Footer />
        </div>
    );
};
