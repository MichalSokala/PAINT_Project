import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Travel from "./components/Travel";
import TravelGroup from "./components/TravelGroup";
import Cost from "./components/Cost";
import TravelPart from "./components/TravelPart";
import ItemList from "./components/ItemList";
import PlacesToSee from "./components/PlacesToSee";
import AppStart_page from "./components/AppStart_page";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppStart_page />} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/home/travel" element={<Travel />} />
                <Route path="/home/travel_groups" element={<TravelGroup />} />
                <Route path="/home/costs" element={<Cost />} />
                <Route path="/home/travel_parts" element={<TravelPart />} />
                <Route path="/home/items" element={<ItemList />} />
                <Route path="/home/places" element={<PlacesToSee />} />
            </Routes>
        </Router>
    );
}

export default App;
