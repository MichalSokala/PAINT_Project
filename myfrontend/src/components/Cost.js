import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Layout from "./Layout";
import { useSearchParams } from 'react-router-dom';

const Cost = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [newCost, setNewCost] = useState({
        cost_id: "",
        travel_id: searchParams.get("travel_id"),
        category: "",
        amount: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddCost = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/cost/", newCost);
            setNewCost({
                cost_id: "",
                travel_id: searchParams.get("travel_id"),
                category: "",
                amount: "",
            });
            setErrorMessage("");
             window.location = "/costs";
        } catch (error) {
            console.error("Error while adding cost:", error.response?.data || error.message);
            setErrorMessage("Could not add cost. Check data and try again later.");
        }
    };

    return (
        <Layout>
            {/*dodaj nowy koszt*/}
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                {/*<input*/}
                {/*    type="number"*/}
                {/*    placeholder="cost_id"*/}
                {/*    value={newCost.cost_id}*/}
                {/*    onChange={(e) => setNewCost({...newCost, cost_id: e.target.value})}*/}
                {/*/>*/}
                <input
                    type="number"
                    placeholder="travel_id"
                    value={newCost.travel_id}
                    onChange={(e) =>
                        setNewCost({...newCost, travel_id: e.target.value})
                    }
                />
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Kategoria"*/}
                {/*    value={newCost.category}*/}
                {/*    onChange={(e) =>*/}
                {/*        setNewCost({...newCost, category: e.target.value})*/}
                {/*    }*/}
                {/*/>*/}
                <div>
                    <label>Kategoria</label>
                    <select onChange={(e) =>
                        setNewCost({...newCost, category: e.target.options[e.target.selectedIndex].value})
                    }>
                        <option value="zakwaterowanie">Zakwaterowanie</option>
                        <option value="transport">Transport</option>
                        <option value="jedzenie">Jedzenie</option>
                        <option value="rozrywka">Rozrywka</option>
                        <option value="inne">Inne</option>
                    </select>
                </div>
                <input
                    type="number"
                    placeholder="Koszt"
                    value={newCost.amount}
                    onChange={(e) =>
                        setNewCost({...newCost, amount: e.target.value})
                    }
                />
                <button onClick={handleAddCost}>Add cost</button>
            </form>


        </Layout>
    );
};

export default Cost;
