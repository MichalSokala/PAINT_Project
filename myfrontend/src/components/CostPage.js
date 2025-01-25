import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";

const CostPage = () => {
    const [costs, setCosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchCosts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/cost/");
            setCosts(response.data);


        } catch (error) {
            console.error("Błąd podczas pobierania wydatków:", error);
        }
    };

    useEffect(() => {
        fetchCosts();
    }, []);

    return (
        <Layout>
            <h1>Lista kosztów</h1>
            <ul>
                {costs.map((cost) => (
                    <li key={cost.cost_id}>
                        {cost.travel_id} - {cost.amount} -{" "}
                        {cost.category} -{" "}
                    </li>
                ))}
            </ul>

            <div>
                <Link to="/cost">Dodaj nowy koszt</Link>
            </div>
        </Layout>
    );
};

export default CostPage;
