import React, { useState, useEffect } from "react";
import axios from "axios";

const TravelGroup = () => {
    const [travelGroups, setTravelGroups] = useState([]);
    const [newTravelGroup, setNewTravelGroup] = useState({
        travel_id: "",
        user_id: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    // Funkcja do pobierania grup podróży
    const fetchTravelGroups = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/travel_group/");
            setTravelGroups(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania grup podróży:", error);
        }
    };

    useEffect(() => {
        fetchTravelGroups();
    }, []);

    // Obsługa dodawania nowej grupy podróży
    const handleAddTravelGroup = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/travel_group/", newTravelGroup);
            setNewTravelGroup({
                travel_id: "",
                user_id: "",
            });
            setErrorMessage("");
            fetchTravelGroups(); // Odświeżenie listy
        } catch (error) {
            console.error("Błąd podczas dodawania grupy podróży:", error.response?.data || error.message);
            setErrorMessage("Nie udało się dodać grupy podróży. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <div>
            <h1>Lista grup podróży</h1>
            <h2>Dodaj nową grupę podróży</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="ID podróży"
                    value={newTravelGroup.travel_id}
                    onChange={(e) => setNewTravelGroup({ ...newTravelGroup, travel_id: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="ID użytkownika"
                    value={newTravelGroup.user_id}
                    onChange={(e) => setNewTravelGroup({ ...newTravelGroup, user_id: e.target.value })}
                />
                <button onClick={handleAddTravelGroup}>Dodaj grupę podróży</button>
            </form>

            <ul>
                {travelGroups.map((group) => (
                    <li key={group.group_id}>
                        ID Grupy: {group.group_id} - ID Podróży: {group.travel_id} - ID Użytkownika: {group.user_id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelGroup;
