import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import HomePage from "./components/HomePage";
import Travel from "./components/Travel";
import TravelGroup from "./components/TravelGroup";
import Cost from "./components/Cost";
import TravelPart from "./components/TravelPart";
import ItemList from "./components/ItemList";
import PlacesToSee from "./components/PlacesToSee";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import TravelPage from "./components/TravelPage";
import CostPage from "./components/CostPage";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#4CAF50',
//     },
//     secondary: {
//       main: '#388E3C',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, Arial',
//   },
// });

function App() {
    return (
        // <ThemeProvider theme={{theme}}>
        //     <CssBaseline />
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/travels" element={<TravelPage />} />
                <Route path="/travel" element={<Travel />} />
                <Route path="/travel_groups" element={<TravelGroup />} />
                <Route path="/cost" element={<Cost />} />
                <Route path="/costs" element={<CostPage />} />
                <Route path="/travel_parts" element={<TravelPart />} />
                <Route path="/items" element={<ItemList />} />
                <Route path="/places" element={<PlacesToSee />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
        // </ThemeProvider>
    );
}

export default App;