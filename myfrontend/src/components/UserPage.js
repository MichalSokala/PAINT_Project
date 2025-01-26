import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

const User = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        name: "",
        surname: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/user/");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        try {
            // Wysyłamy poprawnie sformatowane dane
            await axios.post("http://127.0.0.1:8000/api/user/", newUser);

            // Resetujemy stan formularza po dodaniu użytkownika
            setNewUser({
                name: "",
                surname: ""
            });

            setErrorMessage(""); // Czyścimy komunikaty o błędach
            fetchUsers(); // Odświeżamy listę użytkowników
        } catch (error) {
            console.error("Error adding user:", error.response?.data || error.message);
            setErrorMessage("Nie udało się dodać użytkownika. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <Layout>
            <h2>Dodaj nowego użytkownika</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Imię"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nazwisko"
                    value={newUser.surname}
                    onChange={(e) => setNewUser({ ...newUser, surname: e.target.value })}
                />
                <button onClick={handleAddUser}>Dodaj użytkownika</button>
            </form>

            <h2>Lista użytkowników</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        ID: {user.id} - {user.name} {user.surname}
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default User;