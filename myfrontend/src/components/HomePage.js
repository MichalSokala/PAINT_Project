import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <h1>Witamy w aplikacji podróżniczej</h1>
            <nav>
                <ul>
                    <li><Link to="/travels">Podróże</Link></li>
                    <li><Link to="/travel-groups">Grupy podróżnicze</Link></li>
                    <li><Link to="/costs">Koszty</Link></li>
                    <li><Link to="/travel-parts">Części podróży</Link></li>
                    <li><Link to="/items">Lista przedmiotów</Link></li>
                    <li><Link to="/places">Miejsca do zobaczenia</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
