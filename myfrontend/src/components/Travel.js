import React, { useState, useEffect } from "react";
import axios from "axios";

const Travel = () => {
    const [travels, setTravels] = useState([]);
    const [newTravel, setNewTravel] = useState({
        name: "",
        main_destination: "",
        start_date: "",
        end_date: "",
        is_completed: false,
    });

    // Funkcja do pobierania listy podróży
    const fetchTravels = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/travel/");
            setTravels(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania podróży:", error);
        }
    };

    useEffect(() => {
        fetchTravels(); // Pierwsze załadowanie danych
    }, []);

    // Funkcja do obsługi dodawania nowej podróży
    const handleAddTravel = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/travel/", newTravel);
            setNewTravel({
                name: "",
                main_destination: "",
                start_date: "",
                end_date: "",
                is_completed: false,
            });
            fetchTravels(); // Odświeżenie listy po dodaniu nowej podróży
        } catch (error) {
            console.error("Błąd podczas dodawania podróży:", error);
        }
    };

    return (
        <div>
            <h1>Lista podróży</h1>
            <h2>Dodaj nową podróż</h2>
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
                    Czy zakończona:
                    <input
                        type="checkbox"
                        checked={newTravel.is_completed}
                        onChange={(e) =>
                            setNewTravel({ ...newTravel, is_completed: e.target.checked })
                        }
                    />
                </label>
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
        </div>
    );
};

export default Travel;
