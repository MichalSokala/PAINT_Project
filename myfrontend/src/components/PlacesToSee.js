import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { Box, Grid, TextField, Button, Typography, Alert, Stack } from "@mui/material";

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
            fetchPlaces(); // Odświeżenie listy
        } catch (error) {
            console.error("Błąd podczas dodawania miejsca:", error.response?.data || error.message);
            setErrorMessage("Nie udało się dodać miejsca. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <Layout>
            <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Lista miejsc do zobaczenia
                </Typography>

                {/* Wyświetlanie błędów */}
                {errorMessage && (
                    <Alert severity="error" sx={{ marginBottom: "20px" }}>
                        {errorMessage}
                    </Alert>
                )}

                {/* Formularz dodawania nowego miejsca */}
                <Box sx={{ marginBottom: "40px" }}>
                    <Typography variant="h6" gutterBottom>
                        Dodaj nowe miejsce
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="Nazwa miejsca"
                            variant="outlined"
                            fullWidth
                            value={newPlace.name}
                            onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                        />
                        <TextField
                            label="Kraj"
                            variant="outlined"
                            fullWidth
                            value={newPlace.country}
                            onChange={(e) => setNewPlace({ ...newPlace, country: e.target.value })}
                        />
                        <TextField
                            label="ID części podróży"
                            variant="outlined"
                            fullWidth
                            value={newPlace.part_id}
                            onChange={(e) => setNewPlace({ ...newPlace, part_id: e.target.value })}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleAddPlace}
                            sx={{ marginTop: "20px" }}
                        >
                            Dodaj miejsce
                        </Button>
                    </Stack>
                </Box>

                {/* Wyświetlanie listy miejsc */}
                <Typography variant="h5" gutterBottom>
                    Miejsca do zobaczenia
                </Typography>
                <Grid container spacing={2}>
                    {places.map((place) => (
                        <Grid item xs={12} sm={6} md={4} key={place.place_id}>
                            <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
                                <Typography variant="body1" gutterBottom>
                                    <strong>{place.name}</strong>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Kraj: {place.country}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Część podróży ID: {place.part_id}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Layout>
    );
};

export default PlacesToSee;
