import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Box,
  FormGroup,
} from "@mui/material";

const Travel = () => {
  const [travels, setTravels] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTravel, setNewTravel] = useState({
    name: "",
    main_destination: "",
    start_date: "",
    end_date: "",
    is_completed: false,
    user_ids: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  const fetchTravels = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/travel/");
      setTravels(response.data);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTravels();
    fetchUsers();
  }, []);

  const handleAddTravel = async () => {
    try {
      const payload = {
        ...newTravel,
        users: newTravel.user_ids,
      };

      await axios.post("http://127.0.0.1:8000/api/travel/", payload);

      setNewTravel({
        name: "",
        main_destination: "",
        start_date: "",
        end_date: "",
        is_completed: false,
        user_ids: [],
      });

      setErrorMessage("");
      fetchTravels();
    } catch (error) {
      console.error("Error adding travel:", error.response?.data || error.message);
      setErrorMessage("Nie udało się dodać podróży. Sprawdź dane i spróbuj ponownie.");
    }
  };

  const handleUserSelection = (userId) => {
    setNewTravel((prevState) => {
      const alreadySelected = prevState.user_ids.includes(userId);
      if (alreadySelected) {
        return {
          ...prevState,
          user_ids: prevState.user_ids.filter((id) => id !== userId),
        };
      } else {
        return {
          ...prevState,
          user_ids: [...prevState.user_ids, userId],
        };
      }
    });
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Dodaj nową podróż
      </Typography>
      {errorMessage && (
        <Typography variant="body2" color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nazwa"
              fullWidth
              value={newTravel.name}
              onChange={(e) => setNewTravel({ ...newTravel, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Główny Cel"
              fullWidth
              value={newTravel.main_destination}
              onChange={(e) =>
                setNewTravel({ ...newTravel, main_destination: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data rozpoczęcia"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newTravel.start_date}
              onChange={(e) =>
                setNewTravel({ ...newTravel, start_date: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data zakończenia"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newTravel.end_date}
              onChange={(e) =>
                setNewTravel({ ...newTravel, end_date: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newTravel.is_completed}
                  onChange={(e) =>
                    setNewTravel({ ...newTravel, is_completed: e.target.checked })
                  }
                />
              }
              label="Czy zakończona"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Wybierz użytkowników:</Typography>
            <FormGroup row>
              {users.map((user) => (
                <FormControlLabel
                  key={user.id}
                  control={
                    <Checkbox
                      checked={newTravel.user_ids.includes(user.id)}
                      onChange={() => handleUserSelection(user.id)}
                    />
                  }
                  label={`${user.name} ${user.surname}`}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleAddTravel}
          sx={{ mt: 2 }}
        >
          Dodaj podróż
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Lista podróży
      </Typography>
      <ul>
        {travels.map((travel) => (
          <li key={travel.travel_id}>
            {travel.name} - {travel.main_destination} -{" "}
            {new Date(travel.start_date).toLocaleDateString()} do{" "}
            {new Date(travel.end_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Travel;
