import React from "react";
import {Link} from "react-router-dom";
import "./Menu.css"

const Menu = ({ children }) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Strona startowa</Link></li>
                <li><Link to="/travels">Podróże</Link></li>
                <li><Link to="/travel_groups">Grupy podróżnicze</Link></li>
                <li><Link to="/costs">Koszty</Link></li>
                <li><Link to="/travel_parts">Części podróży</Link></li>
                <li><Link to="/items">Lista przedmiotów</Link></li>
                <li><Link to="/places">Miejsca do zobaczenia</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;