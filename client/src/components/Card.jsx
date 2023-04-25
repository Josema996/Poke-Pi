import React from "react";
import { Link } from "react-router-dom";
import "./Css/Card.css";

export default function Card ({ name, image, types, id}) {
    return(
        <div class="card-container">
        <div className="Card2">
            <img src={image} alt="img not found" width="200px" height="250px" className="img" />
            <Link to={`/detail/${id}`}><h2 className="Name"><h5>Nombre y tipo:</h5>{name}</h2></Link>
            
            {
                
                types.map((el) => {
                return(
                    
                    <h2 className="type" key={types.name}>{el.name}</h2>
                )
             })
            }
            
        </div>
        
        </div>
        

    )
}