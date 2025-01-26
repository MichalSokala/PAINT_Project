import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Layout from "./Layout";

const Travel = () => {
    const [travels, setTravels] = useState([]);
    const [users, setUsers] = useState([]);
    const [newTravel, setNewTravel] = useState({
        name: "",
        main_destination: "",
        start_date: "",
        end_date: "",
        is_completed: false,
        user_ids: []
    });
    const [errorMessage, setErrorMessage] = useState("");

    const fetchTravels = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/travel/");
            setTravels(response.data);
        } catch (error) {
            console.error("Error fetching travels:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/user/");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchTravels();
        fetchUsers();
    }, []);

    const handleAddTravel = async () => {
    try {
        // Tworzymy payload z zamianą user_ids na users
        const payload = {
            ...newTravel,
            users: newTravel.user_ids, // Backend oczekuje klucza `users`
        };

        // Wysyłamy poprawnie sformatowane dane
        await axios.post("http://127.0.0.1:8000/api/travel/", payload);

        // Resetujemy stan formularza po dodaniu podróży
        setNewTravel({
            name: "",
            main_destination: "",
            start_date: "",
            end_date: "",
            is_completed: false,
            user_ids: []
        });

        setErrorMessage(""); // Czyścimy komunikaty o błędach
        fetchTravels(); // Odświeżamy listę podróży
    } catch (error) {
        console.error("Error adding travel:", error.response?.data || error.message);
        setErrorMessage("Nie udało się dodać podróży. Sprawdź dane i spróbuj ponownie.");
        }
    };

    const handleUserSelection = (userId) => {
        setNewTravel((prevState) => {
            const alreadySelected = prevState.user_ids.includes(userId);
            if (alreadySelected) {
                return {
                    ...prevState,
                    user_ids: prevState.user_ids.filter((id) => id !== userId),
                };
            } else {
                return {
                    ...prevState,
                    user_ids: [...prevState.user_ids, userId],
                };
            }
        });
    };

    return (
        <Layout>
            <h2>Dodaj nową podróż</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Nazwa"
                    value={newTravel.name}
                    onChange={(e) => setNewTravel({ ...newTravel, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Cel główny"
                    value={newTravel.main_destination}
                    onChange={(e) =>
                        setNewTravel({ ...newTravel, main_destination: e.target.value })
                    }
                />
                <input
                    type="datetime-local"
                    value={newTravel.start_date}
                    onChange={(e) =>
                        setNewTravel({ ...newTravel, start_date: e.target.value })
                    }
                />
                <input
                    type="datetime-local"
                    value={newTravel.end_date}
                    onChange={(e) =>
                        setNewTravel({ ...newTravel, end_date: e.target.value })
                    }
                />
                <label>
                    <input
                        type="checkbox"
                        checked={newTravel.is_completed}
                        onChange={(e) =>
                            setNewTravel({ ...newTravel, is_completed: e.target.checked })
                        }
                    />
                    Czy zakończona
                </label>
                <div>
                    <p>Wybierz użytkowników:</p>
                    {users.map((user) => (
                        <label key={user.id}>
                            <input
                                type="checkbox"
                                value={user.id}
                                checked={newTravel.user_ids.includes(user.id)}
                                onChange={() => handleUserSelection(user.id)}
                            />
                            {user.name} {user.surname}
                        </label>
                    ))}
                </div>
                <button onClick={handleAddTravel}>Dodaj podróż</button>
            </form>

            <ul>
                {travels.map((travel) => (
                    <li key={travel.travel_id}>
                        {travel.name} - {travel.main_destination} -{" "}
                        {new Date(travel.start_date).toLocaleDateString()} do{" "}
                        {new Date(travel.end_date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default Travel;
