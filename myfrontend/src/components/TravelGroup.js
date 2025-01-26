import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Alert,
    Stack,
} from "@mui/material";

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
        <Layout>
            <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Grupy podróży
                </Typography>

                {/* Wyświetlanie błędów */}
                {errorMessage && (
                    <Alert severity="error" sx={{ marginBottom: "20px" }}>
                        {errorMessage}
                    </Alert>
                )}


                {/* Formularz dodawania nowej grupy */}
                <Box sx={{ marginTop: "20px" }}>
                    <Typography variant="h6" gutterBottom>
                        Dodaj nową grupę podróży
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="ID Podróży"
                            variant="outlined"
                            fullWidth
                            value={newTravelGroup.travel_id}
                            onChange={(e) =>
                                setNewTravelGroup((prev) => ({
                                    ...prev,
                                    travel_id: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="ID Użytkownika"
                            variant="outlined"
                            fullWidth
                            value={newTravelGroup.user_id}
                            onChange={(e) =>
                                setNewTravelGroup((prev) => ({
                                    ...prev,
                                    user_id: e.target.value,
                                }))
                            }
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleAddTravelGroup}
                        >
                            Dodaj grupę podróży
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Layout>
    );
};

export default TravelGroup;
