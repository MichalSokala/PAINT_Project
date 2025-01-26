import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import "./Menu.css";

const Menu = ({ isDrawer }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Jeśli to Drawer, zawsze renderuj zawartość, niezależnie od rozmiaru ekranu
  if (isDrawer) {
    return (
          <ul className="drawer-menu">
            <li><Link to="/">Strona startowa</Link></li>
            <li><Link to="/travels">Podróże</Link></li>
            <li><Link to="/travel_groups">Grupy podróżnicze</Link></li>
            <li><Link to="/costs">Koszty</Link></li>
            <li><Link to="/travel_parts">Części podróży</Link></li>
            <li><Link to="/items">Lista przedmiotów</Link></li>
            <li><Link to="/places">Miejsca do zobaczenia</Link></li>
          </ul>
    );
  }

  // Dla stałego menu renderuj tylko na dużych ekranach
  if (!isMobile) {
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
  }
  return null; // Ukryj całkowicie na małych ekranach, jeśli nie jest Drawerem
};

export default Menu;
