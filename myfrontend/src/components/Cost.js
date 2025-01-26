import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import { useSearchParams } from "react-router-dom";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Typography, Box } from "@mui/material";

const Cost = () => {
    const [searchParams] = useSearchParams();
    const [newCost, setNewCost] = useState({
        cost_id: "",
        travel_id: searchParams.get("travel_id"),
        category: "",
        amount: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddCost = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/cost/", newCost);
            setNewCost({
                cost_id: "",
                travel_id: searchParams.get("travel_id"),
                category: "",
                amount: "",
            });
            setErrorMessage("");
            window.location = "/costs";
        } catch (error) {
            console.error("Error while adding cost:", error.response?.data || error.message);
            setErrorMessage("Nie udało się dodać wydatku. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <Layout>
            <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Dodaj nowy wydatek
                </Typography>
                {errorMessage && (
                    <Typography color="error" sx={{ marginBottom: "16px" }}>
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <TextField
                        label="ID podróży"
                        type="number"
                        value={newCost.travel_id}
                        onChange={(e) => setNewCost({ ...newCost, travel_id: e.target.value })}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Kategoria</InputLabel>
                        <Select
                            value={newCost.category}
                            onChange={(e) =>
                                setNewCost({ ...newCost, category: e.target.value })
                            }
                        >
                            <MenuItem value="zakwaterowanie">Zakwaterowanie</MenuItem>
                            <MenuItem value="transport">Transport</MenuItem>
                            <MenuItem value="jedzenie">Jedzenie</MenuItem>
                            <MenuItem value="rozrywka">Rozrywka</MenuItem>
                            <MenuItem value="inne">Inne</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Wydana kwota"
                        type="number"
                        value={newCost.amount}
                        onChange={(e) =>
                            setNewCost({ ...newCost, amount: e.target.value })
                        }
                        fullWidth
                    />
                    <Button onClick={handleAddCost} variant="contained" color="success">
                        Dodaj wydatki
                    </Button>
                </form>
            </Box>
        </Layout>
    );
};

export default Cost;
