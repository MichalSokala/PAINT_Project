import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Grid } from "@mui/material";

const TravelPage = () => {
    const [travels, setTravels] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    const [startDate, setStartDate] = useState(""); // State for start date
    const [endDate, setEndDate] = useState(""); // State for end date

    const fetchTravels = async () => {
        try {
              const response = await axios.get("http://127.0.0.1:8000/api/travel/");
              setTravels(response.data);
              console.log(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania podróży:", error);
        }
    };

    const fetchWeather = async (travelId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/travel/${travelId}/weather?city=${city}`);
            setWeatherData(response.data.weather);
            setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
        console.error("Błąd podczas pobierania pogody:", error);
        setErrorMessage("Nie udało się pobrać danych o pogodzie dla tego miejsca.");
    }
    };

    useEffect(() => {
        fetchTravels();
    }, []);

    return (
        <Layout>
          {/*<h1>Moje podróże</h1>*/}

          {/*/!* tabela moich podrózy*!/*/}
          {/*<ul>*/}
          {/*  {travels.map((travel) => (*/}
          {/*    <li key={travel.travel_id}>*/}
          {/*      {travel.name} - {travel.main_destination} -{" "}*/}
          {/*      {new Date(travel.start_date).toLocaleDateString()} do{" "}*/}
          {/*      {new Date(travel.end_date).toLocaleDateString()}*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*</ul>*/}
          <Typography variant="h4" gutterBottom>
              Moje podróże
          </Typography>
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="lista podróży">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Nazwa podróży</strong></TableCell>
                        <TableCell><strong>Główne miejsce</strong></TableCell>
                        <TableCell><strong>Data rozpoczęcia</strong></TableCell>
                        <TableCell><strong>Data zakończenia</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {travels.map((travel) => (
                        <TableRow key={travel.travel_id}>
                            <TableCell>{travel.name}</TableCell>
                            <TableCell>{travel.main_destination}</TableCell>
                            <TableCell>{new Date(travel.start_date).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(travel.end_date).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Znajdź informacje o pogodzie w miejscu, do którego jedzisz
            </Typography>

            <TextField
                label="Wpisz miasto"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ marginBottom: "20px", width: "300px" }}
            />

            <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        label="Data początkowa"
                        type="date"
                        variant="outlined"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: "48%" }}
                    />
                    <TextField
                        label="Data końcowa"
                        type="date"
                        variant="outlined"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: "48%" }}
                    />
            </Box>

            <Box mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fetchWeather(travels[0]?.travel_id)}
                >
                    Sprawdź pogodę
                </Button>
            </Box>


          {errorMessage && (
          <Typography color="error" variant="body1">
            {errorMessage}
          </Typography>
        )}

          {errorMessage && (
                    <Typography color="error" variant="body1">
                        {errorMessage}
                    </Typography>
                )}

                {/* Weather Data Display */}
                <Grid container spacing={2} mt={2}>
                    {weatherData.map((day) => (
                        <Grid item xs={12} sm={6} md={4} key={day.date}>
                            <Box border={1} borderRadius={4} padding={2}>
                                <Typography variant="h6">{new Date(day.date).toLocaleDateString()}</Typography>
                                <Typography>Max Temp: {day.max_temp}°C</Typography>
                                <Typography>Min Temp: {day.min_temp}°C</Typography>
                                <Typography>Precipitation: {day.precipitation} mm</Typography>
                                <Typography>Description: {day.description}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Button to Add New Travel */}
            <div style={{ marginTop: "20px" }}>
                <Button
                    component={Link}
                    to="/travel"
                    variant="contained"
                    color="success"
                    size="large"
                >
                    Dodaj nową podróż
                </Button>
            </div>
        </Layout>
    );
};

export default TravelPage;