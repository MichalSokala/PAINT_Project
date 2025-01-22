import React from "react";
import Header from "./Header";
import "./Form";

const handleLogin = async () => {

}

const LoginPage = () => {
    return (
        <div>
            <Header/>
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
        </div>
    );
};

export default LoginPage;
