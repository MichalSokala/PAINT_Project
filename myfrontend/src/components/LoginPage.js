import React from "react";
import Header from "./Header";
import "./Form";
import {Link} from "react-router-dom";
import Layout from "./Layout";

const handleLogin = async () => {

}

const LoginPage = () => {
    return (
        <Layout>
            <h1>Logowanie użytkownika</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Login"
                />
                <input
                    type="password"
                    placeholder="Hasło"
                />

                <button onClick={handleLogin}>Zaloguj</button>
            </form>

            <div>
                Nie masz jeszcze konta w serwisie?
                <Link to="/register">Zarejestruj się</Link>
            </div>
        </Layout>
    );
};

export default LoginPage;
