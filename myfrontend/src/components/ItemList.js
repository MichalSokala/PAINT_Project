import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { Box, Grid, TextField, Button, Typography, Alert, Stack, FormControlLabel, Checkbox } from "@mui/material";

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
            fetchItems(); // Odświeżenie listy
        } catch (error) {
            console.error("Błąd podczas dodawania przedmiotu:", error.response?.data || error.message);
            setErrorMessage("Nie udało się dodać przedmiotu. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <Layout>
            <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Lista przedmiotów
                </Typography>

                {/* Wyświetlanie błędów */}
                {errorMessage && (
                    <Alert severity="error" sx={{ marginBottom: "20px" }}>
                        {errorMessage}
                    </Alert>
                )}

                {/* Formularz dodawania nowego przedmiotu */}
                <Box sx={{ marginBottom: "40px" }}>
                    <Typography variant="h6" gutterBottom>
                        Dodaj nowy przedmiot
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="Nazwa przedmiotu"
                            variant="outlined"
                            fullWidth
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={newItem.is_packed}
                                    onChange={(e) => setNewItem({ ...newItem, is_packed: e.target.checked })}
                                    color="success"
                                />
                            }
                            label="Czy spakowany?"
                        />
                        <TextField
                            label="ID podróży"
                            variant="outlined"
                            fullWidth
                            value={newItem.travel_id}
                            onChange={(e) => setNewItem({ ...newItem, travel_id: e.target.value })}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleAddItem}
                            sx={{ marginTop: "20px" }}
                        >
                            Dodaj przedmiot
                        </Button>
                    </Stack>
                </Box>

                {/* Wyświetlanie listy przedmiotów */}
                <Typography variant="h5" gutterBottom>
                    Przedmioty w podróży
                </Typography>
                <Grid container spacing={2}>
                    {items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.item_id}>
                            <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
                                <Typography variant="body1" gutterBottom>
                                    <strong>{item.name}</strong>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Status: {item.is_packed ? "Spakowany" : "Niespakowany"}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ID podróży: {item.travel_id}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Layout>
    );
};

export default ItemList;
