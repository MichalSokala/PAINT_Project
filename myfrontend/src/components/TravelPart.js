import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

const TravelPart = () => {
    const [travelParts, setTravelParts] = useState([]);
    const [newTravelPart, setNewTravelPart] = useState({
        travel_id: "",
        start_location: "",
        end_location: "",
        transport: "",
        part_start_date: "",
        part_end_date: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    // Funkcja do pobierania części podróży
    const fetchTravelParts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/travel_part/");
            setTravelParts(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania części podróży:", error);
        }
    };

    useEffect(() => {
        fetchTravelParts();
    }, []);

    // Obsługa dodawania nowej części podróży
    const handleAddTravelPart = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/travel_part/", newTravelPart);
            setNewTravelPart({
                travel_id: "",
                start_location: "",
                end_location: "",
                transport: "",
                part_start_date: "",
                part_end_date: "",
            });
            setErrorMessage("");
            fetchTravelParts(); // Odświeżenie listy
        } catch (error) {
            console.error("Błąd podczas dodawania części podróży:", error.response?.data || error.message);
            setErrorMessage("Nie udało się dodać części podróży. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <Layout>
            <h1>Lista części podróży</h1>
            <h2>Dodaj nową część podróży</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="ID podróży"
                    value={newTravelPart.travel_id}
                    onChange={(e) => setNewTravelPart({ ...newTravelPart, travel_id: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Miejsce początkowe"
                    value={newTravelPart.start_location}
                    onChange={(e) => setNewTravelPart({ ...newTravelPart, start_location: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Miejsce końcowe"
                    value={newTravelPart.end_location}
                    onChange={(e) => setNewTravelPart({ ...newTravelPart, end_location: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Środek transportu"
                    value={newTravelPart.transport}
                    onChange={(e) => setNewTravelPart({ ...newTravelPart, transport: e.target.value })}
                />
                <input
                    type="datetime-local"
                    placeholder="Data rozpoczęcia"
                    value={newTravelPart.part_start_date}
                    onChange={(e) => setNewTravelPart({ ...newTravelPart, part_start_date: e.target.value })}
                />
                <input
                    type="datetime-local"
                    placeholder="Data zakończenia"
                    value={newTravelPart.part_end_date}
                    onChange={(e) => setNewTravelPart({ ...newTravelPart, part_end_date: e.target.value })}
                />
                <button onClick={handleAddTravelPart}>Dodaj część podróży</button>
            </form>

            <ul>
                {travelParts.map((part) => (
                    <li key={part.part_id}>
                        ID Podróży: {part.travel_id} | Od: {part.start_location} do {part.end_location} |
                        Transport: {part.transport} | Rozpoczęcie:{" "}
                        {new Date(part.part_start_date).toLocaleString()} | Zakończenie:{" "}
                        {new Date(part.part_end_date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default TravelPart;