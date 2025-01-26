import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Alert,
    Stack,
} from "@mui/material";

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
            <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Części podróży
                </Typography>

                {/* Wyświetlanie błędów */}
                {errorMessage && (
                    <Alert severity="error" sx={{ marginBottom: "20px" }}>
                        {errorMessage}
                    </Alert>
                )}

                {/* Formularz dodawania nowej części podróży */}
                <Box sx={{ marginBottom: "40px" }}>
                    <Typography variant="h6" gutterBottom>
                        Dodaj nową część podróży
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="ID Podróży"
                            variant="outlined"
                            fullWidth
                            value={newTravelPart.travel_id}
                            onChange={(e) =>
                                setNewTravelPart((prev) => ({
                                    ...prev,
                                    travel_id: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Miejsce początkowe"
                            variant="outlined"
                            fullWidth
                            value={newTravelPart.start_location}
                            onChange={(e) =>
                                setNewTravelPart((prev) => ({
                                    ...prev,
                                    start_location: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Miejsce końcowe"
                            variant="outlined"
                            fullWidth
                            value={newTravelPart.end_location}
                            onChange={(e) =>
                                setNewTravelPart((prev) => ({
                                    ...prev,
                                    end_location: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Środek transportu"
                            variant="outlined"
                            fullWidth
                            value={newTravelPart.transport}
                            onChange={(e) =>
                                setNewTravelPart((prev) => ({
                                    ...prev,
                                    transport: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Data rozpoczęcia"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            fullWidth
                            value={newTravelPart.part_start_date}
                            onChange={(e) =>
                                setNewTravelPart((prev) => ({
                                    ...prev,
                                    part_start_date: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Data zakończenia"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            fullWidth
                            value={newTravelPart.part_end_date}
                            onChange={(e) =>
                                setNewTravelPart((prev) => ({
                                    ...prev,
                                    part_end_date: e.target.value,
                                }))
                            }
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleAddTravelPart}
                        >
                            Dodaj część podróży
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Layout>
    );
};

export default TravelPart;
