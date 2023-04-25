import React from "react";
import {Link} from 'react-router-dom';
import css from './Css/Landing.css';

export default function LandingPage(){
    
    return(
        
        <div className="container">
            <div className="css">
                <h1 className="img">
                    Bienvenidos a Mundo Pokemon
                </h1>
                <Link to='/home'>
                    <button className="btn">Ingresar</button>
                </Link>
            </div>
        </div>
    )
}