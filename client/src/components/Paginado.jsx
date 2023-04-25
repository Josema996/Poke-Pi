import React from "react";
import "./Css/Paginado.css";

export default function Paginado ({PokemonsPerPage, allPokemons, paginado}){
    const PageNumber = []

    for(let i = 0; i < Math.ceil(allPokemons/PokemonsPerPage); i++){
        PageNumber.push(i + 1)
    }

    return(
        <nav>
            <ul className="paginado">
                { PageNumber && 
                PageNumber.map(number => (
                    <li className="number" key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}