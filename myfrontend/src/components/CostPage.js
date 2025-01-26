import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

const CostPage = () => {
    const [costs, setCosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchCosts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/cost/");
            setCosts(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania wydatków:", error);
            setErrorMessage("Nie udało się pobrać wydatków. Spróbuj ponownie później.");
        }
    };

    useEffect(() => {
        fetchCosts();
    }, []);

    return (
        <Layout>
            <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Lista kosztów
                </Typography>
                {errorMessage && (
                    <Typography color="error" sx={{ marginBottom: "16px" }}>
                        {errorMessage}
                    </Typography>
                )}
                <List sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px", padding: "16px" }}>
                    {costs.map((cost) => (
                        <ListItem key={cost.cost_id} divider>
                            <ListItemText
                                primary={`ID podróży: ${cost.travel_id}`}
                                secondary={`Kategoria: ${cost.category}, Kwota: ${cost.amount} zł`}
                            />
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ marginTop: "24px", textAlign: "center" }}>
                    <Button
                        variant="contained"
                        color="success"
                        component={Link}
                        to="/cost"
                    >
                        Dodaj nowy koszt
                    </Button>
                </Box>

                <Box sx={{ marginTop: "32px" }}>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: "series A" },
                                    { id: 1, value: 15, label: "series B" },
                                    { id: 2, value: 20, label: "series C" },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </Box>
            </Box>
        </Layout>
    );
};

export default CostPage;
