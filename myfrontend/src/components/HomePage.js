import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import TravelGrid from "./TravelGrid";

const HomePage = () => {
    return (
        <Layout>
            <h1>Witamy w aplikacji podróżniczej!</h1>
            <img src="logo512.png" alt="Logo aplikacji podróżniczej" className="home-logo"/>
        </Layout>
    );
};

export default HomePage;
