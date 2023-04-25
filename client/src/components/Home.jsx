import React from "react";
import {Link} from 'react-router-dom';
//importo los hooks que voy a usar de react
import {useState, useEffect} from 'react';
//importo los hooks de react-redux
import {useDispatch, useSelector} from 'react-redux'
//importo las actions que me interesan usar en este componente
import { getPokemons, filterCreated, orderByName, orderByAttack } from "../actions/index";
//importo los componentes que voy a usar
import Card from "./Card.jsx";
import css from "./Css/Home.css";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";



export default function Home(){

const dispatch = useDispatch()
const allPokemons = useSelector((state) => state.pokemons);
const alltypes = useSelector((state) => state.types);
const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [PokemonsPerPage, setPokemonsPerPage] = useState(12)
const indexOfLastPokemons = currentPage * PokemonsPerPage //12
const indexOfFirstPokemons = indexOfLastPokemons - PokemonsPerPage //0
const currentPokemons = allPokemons.slice(indexOfFirstPokemons, indexOfLastPokemons)


const paginado = (PageNumber) => {
    setCurrentPage(PageNumber)
} 



useEffect(() => {
    dispatch(getPokemons());
},[dispatch])

function handleClick(e){
e.preventDefault();
dispatch(getPokemons());
}

function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
}

function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleAttack(e){
    e.preventDefault();
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}


return (
    <div>
        <div>
            <Link to='/'><button  className="btn-Crear">Volver</button></Link >
            <Link to='/pokemons'><button  className="btn-Crear">Crear Pokemon</button></Link >
            <h2 class="pokemon-title">Bienvenidos maestros Pokemons</h2>
            <button onClick={e=> {handleClick(e)}} className="btn-Crear">
            Volver a cargar todos los pokemons
            </button>
        </div>
 <p/>
 <div>
    <label>Nombre : </label>
    <select onChange={e => handleSort(e)}>
        <option value='asc'>Ascendente</option>
        <option value='des'>Descendente</option>
    </select>
    <br>
    </br>

    <label>Ataque : </label>
    <select onChange={e => handleAttack(e)} >
        <option value='atasc'> Menor Ataque</option>
        <option value='atdes'> Mayor Ataque</option>
    </select>
    <br>
    </br>

    <label>Pokemons : </label>
    <select onChange={e => handleFilterCreated(e)}>
        <option value='All'>Todos</option>
        <option value='Api'>Api</option>
        <option value='Created'>Creados</option>
    </select>
    <p/>
     <SearchBar/>

    <Paginado
    PokemonsPerPage = {PokemonsPerPage}
    allPokemons={allPokemons.length}
    paginado={paginado}
    />

   
   
{
    currentPokemons?.map((el) =>{
        return (
            <div className={css.card} key={el.id}>
                <Link to={"/home" + el.id}>
                    <Card name={el.name} image={el.img ? el.img : el.img} types={el.types} id={el.id} />
                </Link>
            </div>
        );
        
    })
}

 </div>
    </div>
)
}