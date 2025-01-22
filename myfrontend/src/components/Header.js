import "./Header.css";
import {Link} from "react-router-dom";
import React from "react";

const Header = () => {
    return (
        <header>
            <div>
                Aplikacja podróżnicza
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
        </header>
    );
};

export default Header;