import "./TravelGrid.css";
import {Link} from "react-router-dom";
import React from "react";

const TravelGrid = () => {
    return (
        <div className="grid">
            <div>
                <img src={`${process.env.PUBLIC_URL}/assets/italia.jpg`} alt="Italia"/>
                <div>Rzym</div>
            </div>
            <div>
                <img src={`${process.env.PUBLIC_URL}/assets/paris.jpg`} alt="Paryż"/>
                <div>Paryż</div>
            </div>
            <div>
                <img src={`${process.env.PUBLIC_URL}/assets/japan.jpg`} alt="Japonia"/>
                <div>Japonia</div>
            </div>
            <div>
                <img src={`${process.env.PUBLIC_URL}/assets/canada.jpg`} alt="Kanada"/>
                <div>Kanada</div>
            </div>

        </div>
    );
};

export default TravelGrid;