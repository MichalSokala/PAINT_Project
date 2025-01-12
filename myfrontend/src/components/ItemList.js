import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: "",
        is_packed: false,
        travel_id: "", // Foreign key to Travel
    });
    const [errorMessage, setErrorMessage] = useState("");

    // Pobierz listę przedmiotów
    const fetchItems = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/item_list/");
            setItems(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania przedmiotów:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Obsługa dodawania nowego przedmiotu
    const handleAddItem = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/item_list/", newItem);
            setNewItem({
                name: "",
                is_packed: false,
                travel_id: "",
            });
            setErrorMessage("");
            fetchItems();
        } catch (error) {
            console.error("Błąd podczas dodawania przedmiotu:", error.response?.data || error.message);
            setErrorMessage("Nie udało się dodać przedmiotu. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <div>
            <h1>Lista przedmiotów</h1>
            <h2>Dodaj nowy przedmiot</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Nazwa przedmiotu"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <label>
                    Czy spakowany:
                    <input
                        type="checkbox"
                        checked={newItem.is_packed}
                        onChange={(e) => setNewItem({ ...newItem, is_packed: e.target.checked })}
                    />
                </label>
                <input
                    type="text"
                    placeholder="ID podróży"
                    value={newItem.travel_id}
                    onChange={(e) => setNewItem({ ...newItem, travel_id: e.target.value })}
                />
                <button onClick={handleAddItem}>Dodaj przedmiot</button>
            </form>

            <ul>
                {items.map((item) => (
                    <li key={item.item_id}>
                        {item.name} - {item.is_packed ? "Spakowany" : "Niespakowany"} (ID podróży: {item.travel_id})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
