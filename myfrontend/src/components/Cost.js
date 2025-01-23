import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

const Cost = () => {
    const [costs, setCosts] = useState([]);
    const [newCost, setNewCost] = useState({
        cost_id: "",
        travel_id: "",
        category: "",
        amount: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const fetchCosts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/costs/");//maybe there should be /travel
            setCosts(response.data);
        } catch (error) {
            console.error("An error occurred while fetching costs:", error);
        }
    };

    useEffect(() => {
        fetchCosts();
    }, []);

    const handleAddCost = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/cost/", newCost);
            setNewCost({
                cost_id: "",
                travel_id: "",
                category: "",
                amount: "",
            });
            setErrorMessage("");
            fetchCosts();
        } catch (error) {
            console.error("Error while adding cost:", error.response?.data || error.message);
            setErrorMessage("Could not add cost. Check data and try again later.");
        }
    };

    return (
        <div>
            <Header/>
            <h1>Lista kosztów</h1>
            <h2>Dodaj nowy koszt</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="number"
                    placeholder="cost_id"
                    value={newCost.cost_id}
                    onChange={(e) => setNewCost({ ...newCost, cost_id: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="travel_id"
                    value={newCost.travel_id}
                    onChange={(e) =>
                        setNewCost({ ...newCost, travel_id: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Kategoria"
                    value={newCost.category}
                    onChange={(e) =>
                        setNewCost({ ...newCost, category: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Koszt"
                    value={newCost.amount}
                    onChange={(e) =>
                        setNewCost({ ...newCost, amount: e.target.value })
                    }
                />
                <button onClick={handleAddCost}>Add cost</button>
            </form>

            <ul>
                {costs.map((cost) => (
                    <li key={cost.cost_id}>
                        {cost.travel_id} - {cost.amount} -{" "}
                        {cost.category} -{" "}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cost;
