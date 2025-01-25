import "./Header.css";
import {Link} from "react-router-dom";
import React from "react";
import Button from '@mui/material/Button';

const Header = () => {
    return (
        <header>
            <div className="page-title">
                <Link to="/">TravelApp</Link>
            </div>
            <div>
                <Button variant="contained" color="primary" size="small">
                    <Link to="/login">Login</Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;