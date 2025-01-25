import React, {useState} from "react";
import Header from "./Header";
import "./Form";
import axios from "axios";
import Layout from "./Layout";

const RegisterPage = () => {

    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.currentTarget.form;
        const elements = form.elements;

        console.log(elements.name.value);

        try {
            await axios.post("http://127.0.0.1:8000/api/user/", {
                name: elements.name.value,
                surname: elements.surname.value,
            });

            setErrorMessage("");

            window.location = "/";
        } catch (error) {
            console.error("Błąd podczas rejestracji:", error.response?.data || error.message);
            setErrorMessage("Nie udało się zarejestrować użytkownika. Sprawdź dane i spróbuj ponownie.");
        }
    };

    return (
        <Layout>
            <h1>Rejestracja nowego użytkownika</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="name"
                    placeholder="Imię"
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Nazwisko"
                />

                <button onClick={handleRegister}>Zarejestruj</button>
            </form>
        </Layout>
    );
};

export default RegisterPage;
