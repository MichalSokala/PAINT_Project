import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

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
            <h1>Lista wydatków</h1>

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


            <ul>
                {costs.map((cost) => (
                    <li key={cost.cost_id}>
                        {cost.travel_id} - {cost.amount} -{" "}
                        {cost.category} -{" "}
                    </li>
                ))}
            </ul>

            <div>
                <Link to="/cost">Dodaj nowy koszt</Link>
            </div>

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
                width={600}
                height={500} // Zwiększ wysokość dla lepszej proporcji
                radius={100} // Dostosuj promień wykresu
                innerRadius={40} // Dodaj wewnętrzny promień dla efektu donut
                label={(d) => `${d.label}: ${d.value}`} // Użyj etykiet z wartościami
                labelStyle={{
                    fill: '#fff', // Kolor tekstu etykiety
                    fontSize: '14px', // Rozmiar czcionki etykiety
                    fontWeight: 'bold', // Pogrubienie czcionki
                }}
                tooltip={{
                    style: {
                        backgroundColor: '#333', // Tło tooltipa
                        color: '#fff', // Kolor tekstu tooltipa
                        padding: '10px', // Padding tooltipa
                        borderRadius: '5px', // Zaokrąglone rogi tooltipa
                    },
                    formatter: (value, name) => `${name}: ${value}`, // Formatowanie tooltipa
                }}
                legend={{
                    position: 'right', // Pozycja legendy
                    layout: 'vertical', // Układ pionowy legendy
                    align: 'right', // Wyrównanie legendy do środka
                    verticalAlign: 'top', // Wyrównanie pionowe legendy do góry
                    itemStyle: {
                        color: '#333', // Kolor tekstu legendy
                        fontSize: '12px', // Rozmiar czcionki legendy
                    },
                }}
            />


        </Layout>
    );
};

export default CostPage;

