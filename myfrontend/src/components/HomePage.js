import React from "react";
import Layout from "./Layout";

const HomePage = () => {
    return (
        <Layout>
            <h1>Witamy w aplikacji podróżniczej!</h1>
            <img
                src="logo.png"
                //alt=""
                style={{ width: "1000px", height: "auto" }}
            />
        </Layout>
    );
};

export default HomePage;
