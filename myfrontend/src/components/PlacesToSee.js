import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

const PlacesToSee = () => {
    const [places, setPlaces] = useState([]);
    const [newPlace, setNewPlace] = useState({
        name: "",
        country: "",
        part_id: "", // Foreign key to TravelPart
    });
    const [errorMessage, setErrorMessage] = useState("");

    // Pobierz listę miejsc do zobaczenia
    const fetchPlaces = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/places/");
            setPlaces(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania miejsc:", error);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, []);

    // Obsługa dodawania nowego miejsca
    const handleAddPlace = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/places/", newPlace);
            setNewPlace({
                name: "",
                country: "",
                part_id: "",
            });
            setErrorMessage("");
            fetchPlaces();
        } catch (error) {
            console.error("Błąd podczas dodawania miejsca:", error.response?.data || error.message);
            setErrorMessage("Nie udało się dodać miejsca. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <Layout>
            <h1>Lista miejsc do zobaczenia</h1>
            <h2>Dodaj nowe miejsce</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Nazwa miejsca"
                    value={newPlace.name}
                    onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Kraj"
                    value={newPlace.country}
                    onChange={(e) => setNewPlace({ ...newPlace, country: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="ID części podróży"
                    value={newPlace.part_id}
                    onChange={(e) => setNewPlace({ ...newPlace, part_id: e.target.value })}
                />
                <button onClick={handleAddPlace}>Dodaj miejsce</button>
            </form>

            <ul>
                {places.map((place) => (
                    <li key={place.place_id}>
                        {place.name} - {place.country} (Część podróży ID: {place.part_id})
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default PlacesToSee;