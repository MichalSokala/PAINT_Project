import React from "react";
import Layout from "./Layout";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const HomePage = () => {
    return (
        <Layout>
            <Box textAlign="center" mt={4} mb={4}>
                <Typography variant="h4" gutterBottom>
                    Witamy w TravelMate
                </Typography>
                <img
                    src="logo.png"
                    alt="Logo"
                    style={{ width: "300px", height: "auto" }} // Adjusted image size
                />
                <Typography variant="h6" mt={4}>
                    Czy chcesz zaplanować podróż?
                </Typography>
                <Typography variant="body1" mt={2}>
                    Z TravelMate możesz:
                </Typography>

                <List sx={{ marginTop: 2 }}>
                    <ListItem>
                        <ListItemText primary="- Śledzić wydatki i dzielić koszty z innymi uczestnikami" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="- Tworzyć plany podróży" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="- Dodawać towarzyszy podróży" />
                    </ListItem>
                </List>

                <Typography variant="body1" mt={2}>
                    Zacznij swoją przygodę już dziś!
                </Typography>
            </Box>
        </Layout>
    );
};

export default HomePage;
