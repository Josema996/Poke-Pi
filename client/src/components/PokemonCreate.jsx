import React, { useState,useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postPokemon, getPokemonsTypes} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import css from "./Css/PokemonCreate.css"


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre para el pokemon';
    }else if (!input.hp){
        errors.hp = 'Se requiere saber la vida del pokemon';
    }else if (!input.attack){
        errors.attack = 'Se requiere saber el ataque del pokemon';
    }else if (!input.defense){
        errors.defense = 'Se requiere saber la defensa del pokemon';
    }else if (!input.speed){
        errors.speed = 'Se requiere saber la velocidad del pokemon';
    }
    return errors;
}


export default function PokemonCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState ({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed:"",
        height:"",
        weight:"",
        img:"",
        types:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
        console.log(input)
    }

    function handleDelete(el){
        setInput({
            ...input,
            types: input.types.filter(occ => occ !== el)
        })
    }


    useEffect(() => {
        dispatch(getPokemonsTypes());
    }, []);


    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postPokemon(input))
        alert("POKEMON CREADO!!")
        setInput({
            name: "",
             hp: "",
            attack: "",
            defense: "",
            speed:"",
            height:"",
            weight:"",
            img:"",
            types:[]
        })
        history.push('/home')
    }


    return(
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            <h1>Crea tu pokemon!</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="form">

                <div>
                    <label className="label">Nombre:</label>
                    <input 
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={handleChange}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Vida:</label>
                    <input 
                    type="number"
                    value={input.hp}
                    name="hp"
                    onChange={handleChange}
                    />
                     {errors.hp && (
                        <p className='error'>{errors.hp}</p>
                    )}
                </div>
                <div>
                    <label>Ataque:</label>
                    <input 
                    type="number"
                    value={input.attack}
                    name="attack"
                    onChange={handleChange}
                    />
                     {errors.attack && (
                        <p className='error'>{errors.attack}</p>
                    )}
                </div>
                <div>
                    <label>Defensa:</label>
                    <input 
                    type="number"
                    value={input.defense}
                    name="defense"
                    onChange={handleChange}
                    />
                     {errors.defense && (
                        <p className='error'>{errors.defense}</p>
                    )}
                </div>
                <div>
                    <label>Velocidad:</label>
                    <input 
                    type="number"
                    value={input.speed}
                    name="speed"
                    onChange={handleChange}
                    />
                     {errors.speed && (
                        <p className='error'>{errors.speed}</p>
                    )}
                </div>
                <div>
                    <label>Altura:</label>
                    <input 
                    type="number"
                    value={input.height}
                    name="height"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Peso:</label>
                    <input 
                    type="number"
                    value={input.weight}
                    name="weight"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                    type="text"
                    value={input.img}
                    name="img"
                    onChange={handleChange}
                    />
                </div>
                
            <label>Tipo :</label>
              <select onChange={(e) => handleSelect(e)}>
                {
                    types.map((el) => (
                        <option value={el.name}>{el.name}</option>
                    ))
                    
                }
                
              </select>
                <br>
                </br>
                <p/>
              <ul><li>{input.types.map(el => el + " , ")}</li></ul>
              <button type='submit' className="button">Crear Pokemon</button>
            </form>
            {
                
                input.types.map(el => 
                    <div className="divOcc">
                    <p className="divOcc">{el}</p>
                    <button className=" botonX" onClick={() => handleDelete(el)}>X</button>
                    </div>
                )
            }
        </div>
    )

}