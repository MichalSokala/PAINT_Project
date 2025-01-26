import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        name: "",
        surname: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    // Pobierz użytkowników
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/user/");
            setUsers(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania użytkowników:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Dodaj nowego użytkownika
    const handleAddUser = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/user/", newUser);
            setNewUser({
                name: "",
                surname: ""
            });
            setErrorMessage("");
            fetchUsers();
        } catch (error) {
            console.error("Błąd podczas dodawania użytkownika:", error.response?.data || error.message);
            setErrorMessage("Nie udało się dodać użytkownika. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <Layout>
            <Typography variant="h4" gutterBottom>
                Dodaj nowego użytkownika
            </Typography>

            {errorMessage && <Typography color="error">{errorMessage}</Typography>}

            <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: "20px" }}>
                <TextField
                    label="Imię"
                    variant="outlined"
                    fullWidth
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    style={{ marginBottom: "10px" }}
                />
                <TextField
                    label="Nazwisko"
                    variant="outlined"
                    fullWidth
                    value={newUser.surname}
                    onChange={(e) => setNewUser({ ...newUser, surname: e.target.value })}
                    style={{ marginBottom: "20px" }}
                />
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddUser}
                    fullWidth
                >
                    Dodaj użytkownika
                </Button>
            </form>

            <Typography variant="h5" gutterBottom>
                Lista użytkowników
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Imię</strong></TableCell>
                            <TableCell><strong>Nazwisko</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.surname}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
};

export default UserPage;
