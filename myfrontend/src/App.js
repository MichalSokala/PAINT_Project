import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Travel from "./components/Travel";
import TravelGroup from "./components/TravelGroup";
import Cost from "./components/Cost";
import TravelPart from "./components/TravelPart";
import ItemList from "./components/ItemList";
import PlacesToSee from "./components/PlacesToSee";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/travel" element={<Travel />} />
                <Route path="/travel-groups" element={<TravelGroup />} />
                <Route path="/costs" element={<Cost />} />
                <Route path="/travel-parts" element={<TravelPart />} />
                <Route path="/items" element={<ItemList />} />
                <Route path="/places" element={<PlacesToSee />} />
            </Routes>
        </Router>
    );
}

export default App;
