import React from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";

export default function Detail(props){
    console.log(props)
const dispatch = useDispatch()

const {id} = useParams()

useEffect(() => {
    dispatch(getDetail(id));
},[dispatch, id])

const myPokemon = useSelector ((state) => state.detail)
console.log(myPokemon)

return(
    <div>
        {
            myPokemon.length>0 ?
            <div>
            <h1>Soy {myPokemon[0].name}</h1>
            <img src={myPokemon[0].img? myPokemon[0].img : myPokemon[0].image} alt="" width="500px" height="700px" />
            <h2>Hp: {myPokemon[0].hp}</h2>
            <p>Ataque: {myPokemon[0].attack}</p>
            <p>Defensa: {myPokemon[0].defense}</p>
            <p>Velocidad: {myPokemon[0].speed}</p>
            <p>Altura: {myPokemon[0].height}</p>
            <p>Peso: {myPokemon[0].weight}</p>
            <div>Tipo: {myPokemon[0].types.map((tipo) => (<div><span>{tipo.name}</span> <img src={tipo.img}/></div>))}</div>

            </div> : <p>Loading..</p>
        }
        <Link to='/home'>
            <button>Volver</button>
        </Link>
    </div>
)

}