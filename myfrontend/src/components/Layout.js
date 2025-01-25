import React from "react";
import Header from "./Header"
import Menu from "./Menu"
import "./Layout.css"

const Layout = ({ children }) => {
    return (
        <div>
            <Header/>
            <div id="Content">
                <Menu/>
                <article>
                    {children}
                </article>
            </div>
            <footer>
                Copyright
            </footer>
        </div>
    );
};

export default Layout;