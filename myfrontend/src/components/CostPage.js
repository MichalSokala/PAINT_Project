import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, List, ListItem, ListItemText, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const CostPage = () => {
    const [costs, setCosts] = useState([]);
    const [totalCosts, setTotalCosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [travelId, setTravelId] = useState(1);
    const [travels, setTravels] = useState([]); // Do wyboru: lista podróży

    const fetchTravels = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/travel/"); // Endpoint do pobrania podróży
            setTravels(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania podróży:", error);
        }
    };

    const fetchCosts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/cost/", {params: {travel_id:travelId}});
            setCosts(response.data);

        } catch (error) {
            console.error("Błąd podczas pobierania wydatków:", error);
        }
    };

    const fetchTotalCosts = async () => {
        try {
            console.log(travelId);
            const response = await axios.get("http://127.0.0.1:8000/api/cost_split/"+travelId+"/category-totals/");
            const data = response.data;

            const d = [
                { id: 1, value: data.category_totals.zakwaterowanie, label: "Zakwaterowanie", color: "#FF6384" },
                { id: 2, value: data.category_totals.transport, label: "Transport", color: "#36A2EB" },
                { id: 3, value: data.category_totals.jedzenie, label: "Jedzenie", color: "#FFCE56" },
                { id: 4, value: data.category_totals.rozrywka, label: "Rozrywka", color: "#4BC0C0" },
                { id: 5, value: data.category_totals.inne, label: "Inne", color: "#9966FF" },
            ];

            //console.log(d);

            setTotalCosts(d);
            //console.log(response.data);


        } catch (error) {
            console.error("Błąd podczas pobierania kosztów całkowitych:", error);
        }
    };

    // useEffect(() => {
    //     fetchCosts();
    //     fetchTotalCosts();
    // }, []);

    useEffect(() => {
        fetchTravels(); // Pobierz listę podróży
        fetchCosts();
    }, [travelId]);

    useEffect(() => {
        console.log(travelId);
        if (travelId) {
            fetchTotalCosts(travelId); // Pobierz koszty dla wybranej podróży
        }
    }, [travelId]);

    const changeTravel = e => {
        console.log(e.target);
        setTravelId(e.target.value);
    };

    return (
        <Layout>
            <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Lista wydatków
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
            </Box>

            {/* Wybierz podróż */}
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="travel-select-label">Wybierz podróż</InputLabel>
                <Select onChange={(event) => setTravelId(event.target.value)} value={travelId}>
                    {/*<MenuItem key={1} value={1}>A</MenuItem>*/}
                    {/*<MenuItem key={2} value={2}>B</MenuItem>*/}
                    {travels.map((travel) => (
                        <MenuItem key={travel.travel_id} value={travel.travel_id}>
                            {travel.name} {/* Zakładając, że obiekt podróży ma pole 'name' */}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            {/*<ul>*/}
            {/*    {costs.map((cost) => (*/}
            {/*        <li key={cost.cost_id}>*/}
            {/*            {cost.travel_id} - {cost.amount} -{" "}*/}
            {/*            {cost.category} -{" "}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}

            {/*<div>*/}
            {/*    <Link to="/cost">Dodaj nowy koszt</Link>*/}
            {/*</div>*/}

            {/*<PieChart*/}
            {/*    colors={['red', 'blue', 'green']} // Use palette*/}
            {/*    series={[*/}
            {/*        {*/}
            {/*            data: totalCosts.map((t) => ({*/}
            {/*                id: t.id,*/}
            {/*                value: t.value,*/}
            {/*                label: t.label,*/}
            {/*                color: t.color,*/}
            {/*            })),*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*    width={400}*/}
            {/*    height={200}*/}
            {/*/>*/}

            <PieChart
                  margin={{ top: 100, bottom: 100, left: 100, right:100 }}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      padding: -20,
                    },
                  }}
                series={[
                    {
                        data: totalCosts.map((t) => ({
                            id: t.id,
                            value: t.value,
                            label: t.label,
                            color: t.color,
                        })),
                    },
                ]}
                width={700}
                height={500}
                radius={100}
                innerRadius={40}
                label={(d) => `${d.label}: ${d.value}`}
                labelStyle={{
                    fill: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                }}
                tooltip={{
                    style: {
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '10px',
                        borderRadius: '5px',
                    },
                    formatter: (value, name) => `${name}: ${value}`,
                }}
                legend={{
                    position: 'right',
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    itemStyle: {
                        color: '#333',
                        fontSize: '12px',
                    },
                }}
            />


        </Layout>
    );
};

export default CostPage;
