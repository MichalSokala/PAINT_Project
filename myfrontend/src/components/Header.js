import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Menu from "./Menu";
import { useMediaQuery } from "@mui/material";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleMenu = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setMenuOpen(open);
  };

  return (
    <header>
      <div className="page-title">
        <Link to="/">TravelApp</Link>
      </div>
      <div>
        {isMobile && (
          <>
            <IconButton
              color="inherit"
              onClick={toggleMenu(true)}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={menuOpen} onClose={toggleMenu(false)}>
              <Menu isDrawer={true} /> {/* Przekazujemy isDrawer */}
            </Drawer>
          </>
        )}
        <Button variant="contained" color="primary" size="small">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
