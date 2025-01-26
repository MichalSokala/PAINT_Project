import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import TravelGrid from "./TravelGrid";
import axios from "axios";
import Button from "@mui/material/Button";

const TravelPage = () => {
  const [travels, setTravels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchTravels = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/travel/");
      setTravels(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Błąd podczas pobierania podróży:", error);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  return (
    <Layout>
      <h1>Moje podróże</h1>

      <ul>
        {travels.map((travel) => (
          <li key={travel.travel_id}>
            {travel.name} - {travel.main_destination} -{" "}
            {new Date(travel.start_date).toLocaleDateString()} do{" "}
            {new Date(travel.end_date).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <div>
        <Button
          component={Link}
          to="/travel"
          variant="contained"
          color="success"
          size="large"
          style={{ marginTop: "20px" }}
        >
          Dodaj nową podróż
        </Button>
      </div>
    </Layout>
  );
};

export default TravelPage;
