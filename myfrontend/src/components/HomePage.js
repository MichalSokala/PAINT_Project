import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const HomePage = () => {
    return (
        <div>
            <Header/>
            <h1>Witamy w aplikacji podróżniczej</h1>
            <nav>
                <ul>
                    <li><Link to="/travel">Podróże</Link></li>
                    <li><Link to="/travel_groups">Grupy podróżnicze</Link></li>
                    <li><Link to="/costs">Koszty</Link></li>
                    <li><Link to="/travel_parts">Części podróży</Link></li>
                    <li><Link to="/items">Lista przedmiotów</Link></li>
                    <li><Link to="/places">Miejsca do zobaczenia</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
